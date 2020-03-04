import { DynamicModule, Module } from "@nestjs/common";
import {
  CounterConfiguration,
  GaugeConfiguration,
  HistogramConfiguration,
  SummaryConfiguration
} from "prom-client";
import { PromCoreModule } from "./prom-core.module";
import {
  MetricTypeConfigurationInterface,
  PromModuleAsyncOptions,
  PromModuleOptions
} from "./prom.module.interface";
import {
  getOrCreateCounterProvider,
  getOrCreateGaugeProvider,
  getOrCreateHistogramProvider,
  getOrCreateSummaryProvider
} from "./prom.provider";
import { MetricType } from "./prom.util";

@Module({})
export class PromModule {
  private static forMetrics(
    metrics: MetricTypeConfigurationInterface[]
  ): DynamicModule {
    const providers = metrics.map(value => {
      switch (value.metricType) {
        case MetricType.Counter:
          return getOrCreateCounterProvider(
            value.configuration,
            value.registryName
          );
        case MetricType.Gauge:
          return getOrCreateGaugeProvider(
            value.configuration,
            value.registryName
          );
        case MetricType.Histogram:
          return getOrCreateHistogramProvider(
            value.configuration,
            value.registryName
          );
        case MetricType.Summary:
          return getOrCreateSummaryProvider(
            value.configuration,
            value.registryName
          );
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
    configuration: CounterConfiguration<string>,
    registryName?: string
  ): DynamicModule {
    return this.forMetrics([
      {
        configuration,
        metricType: MetricType.Counter,
        registryName
      }
    ]);
  }

  static forGauge(
    configuration: GaugeConfiguration<string>,
    registryName?: string
  ): DynamicModule {
    return this.forMetrics([
      {
        configuration,
        metricType: MetricType.Gauge,
        registryName
      }
    ]);
  }

  static forHistogram(
    configuration: HistogramConfiguration<string>,
    registryName?: string
  ): DynamicModule {
    return this.forMetrics([
      {
        configuration,
        metricType: MetricType.Histogram,
        registryName
      }
    ]);
  }

  static forSummary(
    configuration: SummaryConfiguration<string>,
    registryName?: string
  ): DynamicModule {
    return this.forMetrics([
      {
        configuration,
        metricType: MetricType.Summary,
        registryName
      }
    ]);
  }

  static forRoot(options: PromModuleOptions = {}): DynamicModule {
    return {
      imports: [PromCoreModule.forRoot(options)],
      module: PromModule
    };
  }

  static forRootAsync(options: PromModuleAsyncOptions = {}): DynamicModule {
    return {
      imports: [PromCoreModule.forRootAsync(options)],
      module: PromModule
    };
  }
}
