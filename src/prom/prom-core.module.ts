import { DynamicModule, Module, Provider, Global } from "@nestjs/common";
import { PATH_METADATA } from "@nestjs/common/constants";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { collectDefaultMetrics, register, Registry } from "prom-client";
import { PATH_METRICS } from "../app/app.constant";
import {
  HTTP_REQUESTS_TOTAL,
  PROM_CONFIGURATION_DEFAULT,
  PROM_CONFIGURATION_NAME,
  PROM_MODULE_OPTIONS,
  PROM_REGISTRY_DEFAULT,
  PROM_REGISTRY_NAME
} from "./prom.constant";
import { PromController } from "./prom.controller";
import { PromInterceptor } from "./prom.interceptor";
import {
  PromModuleAsyncOptions,
  PromModuleOptions,
  PromOptionsFactory
} from "./prom.module.interface";
import { createCounterProvider } from "./prom.provider";
import { PromService } from "./prom.service";
import { getTokenConfiguration, getTokenRegistry } from "./prom.util";

@Global()
@Module({
  controllers: [PromController],
  exports: [PromService],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PromInterceptor
    },
    PromService,
    createCounterProvider({
      help: "counter",
      labelNames: ["method", "path", "status"],
      name: HTTP_REQUESTS_TOTAL
    })
  ]
})
export class PromCoreModule {
  private static createAsyncOptionsProvider(
    options: PromModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: PROM_MODULE_OPTIONS,
        useFactory: options.useFactory
      };
    }
    return {
      inject: [options.useClass || options.useExisting],
      provide: PROM_MODULE_OPTIONS,
      useFactory: async (optionsFactory: PromOptionsFactory) =>
        PromCoreModule.makeDefaultOptions(
          await optionsFactory.createPromOptions()
        )
    } as Provider;
  }

  private static createAsyncProviders(
    options: PromModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [PromCoreModule.createAsyncOptionsProvider(options)];
    }
    return [
      PromCoreModule.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      } as Provider
    ];
  }

  private static makeDefaultOptions(
    options?: PromModuleOptions
  ): PromModuleOptions {
    return {
      defaultLabels: options === undefined ? {} : options.defaultLabels,
      defaultMetrics: {
        config:
          options === undefined || options.defaultMetrics === undefined
            ? {}
            : options.defaultMetrics.config,
        enabled:
          options === undefined || options.defaultMetrics === undefined
            ? true
            : options.defaultMetrics.enabled
      },
      path: options === undefined ? PATH_METRICS : options.path,
      prefix: options === undefined ? "" : options.prefix,
      registryName:
        options === undefined || options.registryName === undefined
          ? undefined
          : options.registryName
    };
  }

  private static promConfigurationProviderImp(
    promConfigurationName: string,
    _options: PromModuleOptions
  ): void {
    // const opts = PromCoreModule.makeDefaultOptions(options);
    if (promConfigurationName !== PROM_CONFIGURATION_DEFAULT) {
      // TODO: DEFULT CONFIG
    }
    // TODO: CONFIG
  }

  private static promRegistryProviderImp(
    promRegistryName: string,
    options: PromModuleOptions
  ): Registry {
    const opts = PromCoreModule.makeDefaultOptions(options);
    let registry = register;
    if (promRegistryName !== PROM_REGISTRY_DEFAULT) {
      registry = new Registry();
    }
    register.setDefaultLabels({ ...options.defaultLabels });
    if (opts.defaultMetrics?.enabled !== false) {
      const defaultMetricsOptions = {
        ...opts.defaultMetrics?.config,
        register: registry
      };
      collectDefaultMetrics(defaultMetricsOptions);
      Reflect.defineMetadata(PATH_METADATA, opts.path, PromController);
    }
    return registry;
  }

  static forRoot(options: PromModuleOptions = {}): DynamicModule {
    const opts = PromCoreModule.makeDefaultOptions(options);
    const promConfigurationName = getTokenConfiguration(opts.registryName);
    const promConfigurationNameProvider = {
      provide: PROM_CONFIGURATION_NAME,
      useValue: promConfigurationName
    };
    const promConfigurationProvider = {
      provide: promConfigurationName,
      useFactory: (): void =>
        PromCoreModule.promConfigurationProviderImp(
          promConfigurationName,
          options
        )
    };
    const promRegistryName = getTokenRegistry(opts.registryName);
    const promRegistryNameProvider = {
      provide: PROM_REGISTRY_NAME,
      useValue: promRegistryName
    };
    const promRegistryProvider = {
      provide: promRegistryName,
      useFactory: (options: PromModuleOptions): Registry =>
        PromCoreModule.promRegistryProviderImp(promRegistryName, options)
    };
    return {
      exports: [
        promConfigurationNameProvider,
        promConfigurationProvider,
        promRegistryNameProvider,
        promRegistryProvider
      ],
      module: PromCoreModule,
      providers: [
        promConfigurationNameProvider,
        promConfigurationProvider,
        promRegistryNameProvider,
        promRegistryProvider
      ]
    };
  }

  static forRootAsync(options: PromModuleAsyncOptions = {}): DynamicModule {
    const promConfigurationName = getTokenConfiguration(options.registryName);
    const promConfigurationNameProvider = {
      provide: PROM_CONFIGURATION_NAME,
      useValue: promConfigurationName
    };
    const promConfigurationProvider = {
      inject: [PROM_MODULE_OPTIONS],
      provide: promConfigurationName,
      useFactory: (options: PromModuleOptions): void =>
        PromCoreModule.promConfigurationProviderImp(
          promConfigurationName,
          options
        )
    };
    const promRegistryName = getTokenRegistry(options.registryName);
    const promRegistryNameProvider = {
      provide: PROM_REGISTRY_NAME,
      useValue: promRegistryName
    };
    const promRegistryProvider = {
      inject: [PROM_MODULE_OPTIONS],
      provide: promRegistryName,
      useFactory: (options: PromModuleOptions): Registry =>
        PromCoreModule.promRegistryProviderImp(promRegistryName, options)
    };
    const asyncProviders = PromCoreModule.createAsyncProviders(options);
    return {
      exports: [
        promConfigurationNameProvider,
        promConfigurationProvider,
        promRegistryNameProvider,
        promRegistryProvider
      ],
      imports: options.imports,
      module: PromCoreModule,
      providers: [
        ...asyncProviders,
        promConfigurationNameProvider,
        promConfigurationProvider,
        promRegistryNameProvider,
        promRegistryProvider
      ]
    };
  }
}
