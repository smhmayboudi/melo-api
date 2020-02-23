import { DynamicModule, Module, Provider } from "@nestjs/common";
import { PATH_METADATA } from "@nestjs/common/constants";
import { APP_INTERCEPTOR } from "@nestjs/core";
import {
  collectDefaultMetrics,
  CounterConfiguration,
  GaugeConfiguration,
  HistogramConfiguration,
  register,
  Registry,
  SummaryConfiguration
} from "prom-client";
import { PATH_METRICS } from "src/app/app.constant";
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
  MetricTypeConfigurationInterface,
  PromModuleAsyncOptions,
  PromModuleOptions,
  PromOptionsFactory
} from "./prom.module.interface";
import {
  createCounterProvider,
  createGaugeProvider,
  createHistogramProvider,
  createSummaryProvider
} from "./prom.provider";
import { PromService } from "./prom.service";
import {
  getTokenConfiguration,
  getTokenRegistry,
  MetricType
} from "./prom.utils";

@Module({})
export class PromModule {
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
        PromModule.makeDefaultOptions(await optionsFactory.createPromOptions())
    } as Provider;
  }

  private static createAsyncProviders(
    options: PromModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [PromModule.createAsyncOptionsProvider(options)];
    }
    return [
      PromModule.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      } as Provider
    ];
  }

  private static forMetrics(
    metrics: MetricTypeConfigurationInterface[]
  ): DynamicModule {
    const providers = metrics.map(value => {
      switch (value.metricType) {
        case MetricType.Counter:
          return createCounterProvider(value.configuration);
        case MetricType.Gauge:
          return createGaugeProvider(value.configuration);
        case MetricType.Histogram:
          return createHistogramProvider(value.configuration);
        case MetricType.Summary:
          return createSummaryProvider(value.configuration);
        default:
          throw new ReferenceError(
            `The type ${value.metricType} is not supported.`
          );
      }
    });
    return {
      exports: providers,
      module: PromModule,
      providers: providers
    };
  }

  static forCounter(
    configuration: CounterConfiguration<string>
  ): DynamicModule {
    return PromModule.forMetrics([
      {
        configuration,
        metricType: MetricType.Counter
      }
    ]);
  }

  static forGauge(configuration: GaugeConfiguration<string>): DynamicModule {
    return PromModule.forMetrics([
      {
        configuration,
        metricType: MetricType.Gauge
      }
    ]);
  }

  static forHistogram(
    configuration: HistogramConfiguration<string>
  ): DynamicModule {
    return PromModule.forMetrics([
      {
        configuration,
        metricType: MetricType.Histogram
      }
    ]);
  }

  static forSummary(
    configuration: SummaryConfiguration<string>
  ): DynamicModule {
    return PromModule.forMetrics([
      {
        configuration,
        metricType: MetricType.Summary
      }
    ]);
  }

  private static makeDefaultOptions(
    options?: PromModuleOptions
  ): PromModuleOptions {
    return {
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
      registryName:
        options === undefined || options.registryName === undefined
          ? undefined
          : options.registryName
    };
  }

  static forRoot(options: PromModuleOptions = {}): DynamicModule {
    const opts = PromModule.makeDefaultOptions(options);
    Reflect.defineMetadata(PATH_METADATA, opts.path, PromController);
    const promConfigurationName = getTokenConfiguration(opts.registryName);
    const promConfigurationNameProvider = {
      provide: PROM_CONFIGURATION_NAME,
      useValue: promConfigurationName
    };
    const promConfigurationProvider = {
      provide: promConfigurationName,
      useFactory: (): void => {
        if (promConfigurationName !== PROM_CONFIGURATION_DEFAULT) {
          // TODO: DEFULT CONFIG
        }
        // TODO: CONFIG
      }
    };
    const promRegistryName = getTokenRegistry(opts.registryName);
    const promRegistryNameProvider = {
      provide: PROM_REGISTRY_NAME,
      useValue: promRegistryName
    };
    const promRegistryProvider = {
      provide: promRegistryName,
      useFactory: (): Registry => {
        let registry = register;
        if (promRegistryName !== PROM_REGISTRY_DEFAULT) {
          registry = new Registry();
        }
        if (opts.defaultMetrics?.enabled === true) {
          const defaultMetricsOptions = {
            ...opts.defaultMetrics?.config,
            register: registry
          };
          collectDefaultMetrics(defaultMetricsOptions);
        }
        return registry;
      }
    };
    return {
      controllers: [PromController],
      exports: [PromService],
      imports: [],
      module: PromModule,
      providers: [
        promConfigurationNameProvider,
        promConfigurationProvider,
        promRegistryNameProvider,
        promRegistryProvider,
        {
          provide: APP_INTERCEPTOR,
          useClass: PromInterceptor
        },
        PromService,
        createCounterProvider({
          help: `${HTTP_REQUESTS_TOTAL} counter`,
          labelNames: ["method", "path", "status"],
          name: HTTP_REQUESTS_TOTAL
        })
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
      useFactory: (_options: PromModuleOptions): void => {
        if (promConfigurationName !== PROM_CONFIGURATION_DEFAULT) {
          // TODO: DEFULT CONFIG
        }
        // TODO: CONFIG
      }
    };
    const promRegistryName = getTokenRegistry(options.registryName);
    const promRegistryNameProvider = {
      provide: PROM_REGISTRY_NAME,
      useValue: promRegistryName
    };
    const promRegistryProvider = {
      inject: [PROM_MODULE_OPTIONS],
      provide: promRegistryName,
      useFactory: (options: PromModuleOptions): Registry => {
        Reflect.defineMetadata(PATH_METADATA, options.path, PromController);
        let registry = register;
        if (promRegistryName !== PROM_REGISTRY_DEFAULT) {
          registry = new Registry();
        }
        const opts = PromModule.makeDefaultOptions(options);
        if (opts.defaultMetrics?.enabled !== false) {
          const defaultMetricsOptions = {
            ...opts.defaultMetrics?.config,
            register: registry
          };
          collectDefaultMetrics(defaultMetricsOptions);
        }
        return registry;
      }
    };
    const asyncProviders = PromModule.createAsyncProviders(options);
    return {
      controllers: [PromController],
      exports: [PromService],
      imports: options.imports,
      module: PromModule,
      providers: [
        ...asyncProviders,
        promConfigurationNameProvider,
        promConfigurationProvider,
        promRegistryNameProvider,
        promRegistryProvider,
        {
          provide: APP_INTERCEPTOR,
          useClass: PromInterceptor
        },
        PromService,
        createCounterProvider({
          help: `${HTTP_REQUESTS_TOTAL} counter`,
          labelNames: ["method", "path", "status"],
          name: HTTP_REQUESTS_TOTAL
        })
      ]
    };
  }
}
