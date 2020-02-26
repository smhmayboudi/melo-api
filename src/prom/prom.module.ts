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
  createCounterProvider,
  createGaugeProvider,
  createHistogramProvider,
  createSummaryProvider
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
    return this.forMetrics([
      {
        configuration,
        metricType: MetricType.Counter
      }
    ]);
  }

  static forGauge(configuration: GaugeConfiguration<string>): DynamicModule {
    return this.forMetrics([
      {
        configuration,
        metricType: MetricType.Gauge
      }
    ]);
  }

  static forHistogram(
    configuration: HistogramConfiguration<string>
  ): DynamicModule {
    return this.forMetrics([
      {
        configuration,
        metricType: MetricType.Histogram
      }
    ]);
  }

  static forSummary(
    configuration: SummaryConfiguration<string>
  ): DynamicModule {
    return this.forMetrics([
      {
        configuration,
        metricType: MetricType.Summary
      }
    ]);
  }

  static forRoot(options: PromModuleOptions = {}): DynamicModule {
    return {
      module: PromModule,
      imports: [PromCoreModule.forRoot(options)]
    };
  }

  static forRootAsync(options: PromModuleAsyncOptions = {}): DynamicModule {
    return {
      module: PromModule,
      imports: [PromCoreModule.forRootAsync(options)]
    };
  }
}
