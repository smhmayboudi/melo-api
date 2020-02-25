import { DynamicModule, Module, Provider } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { APM_INSTANCE_TOKEN, APM_MODULE_OPTIONS } from "./apm.constant";
import { ApmInterceptor } from "./apm.interceptor";
import {
  Agent,
  ApmModuleAsyncOptions,
  ApmModuleOptions,
  ApmOptionsFactory
} from "./apm.module.interface";
import { ApmService } from "./apm.service";
import { createApmClient } from "./apm.util";

@Module({
  exports: [ApmService],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApmInterceptor
    },
    ApmService
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
      inject: [options.useClass || options.useExisting],
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

  static register(options: ApmModuleOptions = {}): DynamicModule {
    const apmInstanceProvider = {
      provide: APM_INSTANCE_TOKEN,
      useValue: createApmClient(options)
    };
    return {
      module: ApmModule,
      providers: [apmInstanceProvider]
    };
  }

  static registerAsync(options: ApmModuleAsyncOptions = {}): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    const apmInstanceProvider = {
      inject: [APM_MODULE_OPTIONS],
      provide: APM_INSTANCE_TOKEN,
      useFactory: (options: ApmModuleOptions): Agent => createApmClient(options)
    };
    return {
      imports: options.imports,
      module: ApmModule,
      providers: [...asyncProviders, apmInstanceProvider]
    };
  }
}
