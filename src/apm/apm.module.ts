import { DynamicModule, Module, Provider } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import apm from "elastic-apm-node";
import { APM_INSTANCE_TOKEN, APM_MODULE_OPTIONS } from "./apm.constant";
import { ApmInterceptor } from "./apm.interceptor";
import logger from "./apm.logger";
import {
  Agent,
  ApmModuleAsyncOptions,
  ApmModuleOptions,
  ApmOptionsFactory
} from "./apm.module.interface";
import { ApmService } from "./apm.service";

@Module({})
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
    return {
      controllers: [],
      exports: [ApmService],
      imports: [],
      module: ApmModule,
      providers: [
        {
          provide: APM_INSTANCE_TOKEN,
          useValue: apm.start({ logger, ...options })
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: ApmInterceptor
        },
        ApmService
      ]
    };
  }

  static registerAsync(options: ApmModuleAsyncOptions = {}): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      controllers: [],
      exports: [ApmService],
      imports: options.imports,
      module: ApmModule,
      providers: [
        ...asyncProviders,
        {
          inject: [APM_MODULE_OPTIONS],
          provide: APM_INSTANCE_TOKEN,
          useFactory: (opts: ApmModuleOptions): Agent =>
            (apm.start({
              logger,
              ...opts
            }) as unknown) as Agent
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: ApmInterceptor
        },
        ApmService
      ]
    };
  }
}
