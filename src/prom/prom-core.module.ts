import { DynamicModule, Global, Module, Provider, Type } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { Registry } from "prom-client";
import {
  PROM_CONFIGURATION_NAME,
  PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL,
  PROM_MODULE_OPTIONS,
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
import {
  getTokenConfiguration,
  getTokenRegistry,
  promConfigurationProviderImp,
  promRegistryProviderImp,
  makeDefaultOptions
} from "./prom.util";

@Global()
@Module({
  controllers: [PromController],
  exports: [PromService],
  providers: [
    PromService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PromInterceptor
    },
    createCounterProvider({
      help: "counter",
      labelNames: ["method", "path", "status"],
      name: PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL
    })
  ]
})
export class PromCoreModule {
  private static createAsyncOptionsProvider(
    options: PromModuleAsyncOptions
  ): Provider<Promise<PromModuleOptions> | PromModuleOptions> {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: PROM_MODULE_OPTIONS,
        useFactory: options.useFactory
      };
    }
    const inject = [
      (options.useClass || options.useExisting) as Type<PromOptionsFactory>
    ];
    return {
      inject,
      provide: PROM_MODULE_OPTIONS,
      useFactory: async (
        optionsFactory: PromOptionsFactory
      ): Promise<PromModuleOptions> =>
        makeDefaultOptions(await optionsFactory.createPromOptions())
    };
  }

  private static createAsyncProviders(
    options: PromModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<PromOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass
      }
    ];
  }

  static forRoot(options: PromModuleOptions = {}): DynamicModule {
    const opts = makeDefaultOptions(options);
    const promConfigurationName = getTokenConfiguration(opts.registryName);
    const promConfigurationNameProvider: Provider<string> = {
      provide: PROM_CONFIGURATION_NAME,
      useValue: promConfigurationName
    };
    const promConfigurationProvider: Provider<void> = {
      provide: promConfigurationName,
      useFactory: () =>
        promConfigurationProviderImp(promConfigurationName, opts)
    };
    const promRegistryName = getTokenRegistry(opts.registryName);
    const promRegistryNameProvider: Provider<string> = {
      provide: PROM_REGISTRY_NAME,
      useValue: promRegistryName
    };
    const promRegistryProvider: Provider<Registry> = {
      provide: promRegistryName,
      useFactory: () => promRegistryProviderImp(promRegistryName, opts)
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
    const promConfigurationNameProvider: Provider<string> = {
      provide: PROM_CONFIGURATION_NAME,
      useValue: promConfigurationName
    };
    const promConfigurationProvider: Provider<void> = {
      inject: [PROM_MODULE_OPTIONS],
      provide: promConfigurationName,
      useFactory: (options: PromModuleOptions) =>
        promConfigurationProviderImp(promConfigurationName, options)
    };
    const promRegistryName = getTokenRegistry(options.registryName);
    const promRegistryNameProvider: Provider<string> = {
      provide: PROM_REGISTRY_NAME,
      useValue: promRegistryName
    };
    const promRegistryProvider: Provider<Registry> = {
      inject: [PROM_MODULE_OPTIONS],
      provide: promRegistryName,
      useFactory: (options: PromModuleOptions) =>
        promRegistryProviderImp(promRegistryName, options)
    };
    const asyncProviders = this.createAsyncProviders(options);
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
