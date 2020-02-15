import { DynamicModule, Module, Provider } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import apm from "elastic-apm-node";
import { APM_INSTANCE_TOKEN, APM_MODULE_OPTIONS } from "./apm.constant";
import { ApmInterceptor } from "./apm.interceptor";
import {
  ApmModuleAsyncOptions,
  ApmModuleOptions,
  ApmOptionsFactory
} from "./apm.module.interface";
import { ApmService } from "./apm.service";

@Module({
  exports: [ApmService],
  providers: [
    ApmService,
    {
      provide: APM_INSTANCE_TOKEN,
      useValue: apm
    }
  ]
})
export class ApmModule {
  private static createAsyncOptionsProvider(
    options: ApmModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: APM_MODULE_OPTIONS,
        useFactory: options.useFactory
      };
    }
    return {
      inject: [options.useExisting || options.useClass],
      provide: APM_MODULE_OPTIONS,
      useFactory: async (optionsFactory: ApmOptionsFactory) =>
        optionsFactory.createApmOptions()
    } as Provider;
  }

  private static createAsyncProviders(
    options: ApmModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      } as Provider
    ];
  }

  static register(_options: ApmModuleOptions = {}): DynamicModule {
    return {
      exports: [ApmService],
      imports: [],
      module: ApmModule,
      providers: [
        { provide: APM_INSTANCE_TOKEN, useValue: apm },
        ApmService,
        {
          provide: APP_INTERCEPTOR,
          useClass: ApmInterceptor
        }
      ]
    };
  }

  static registerAsync(options: ApmModuleAsyncOptions): DynamicModule {
    return {
      exports: [ApmService],
      imports: options.imports,
      module: ApmModule,
      providers: [
        ...this.createAsyncProviders(options),
        {
          inject: [APM_MODULE_OPTIONS],
          provide: APM_INSTANCE_TOKEN,
          useFactory: (_config: ApmModuleOptions) => apm
        } as Provider
      ]
    };
  }
}
