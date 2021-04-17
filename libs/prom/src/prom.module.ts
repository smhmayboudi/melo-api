import {
  CounterConfiguration,
  GaugeConfiguration,
  HistogramConfiguration,
  SummaryConfiguration,
} from "prom-client";
import { DynamicModule, Module } from "@nestjs/common";
import {
  MetricTypeConfigurationInterface,
  PromModuleAsyncOptions,
  PromModuleOptions,
} from "./prom.module.interface";
import {
  getOrCreateCounterProvider,
  getOrCreateGaugeProvider,
  getOrCreateHistogramProvider,
  getOrCreateSummaryProvider,
} from "./prom.provider";

import { PromCoreModule } from "./prom-core.module";
import { PromMetricType } from "./prom.metric.type";

@Module({})
export class PromModule {
  private static forMetrics(
    metrics: MetricTypeConfigurationInterface[]
  ): DynamicModule {
    const providers = metrics.map((value) => {
      switch (value.metricType) {
        case PromMetricType.counter:
          return getOrCreateCounterProvider(
            value.configuration,
            value.registryName
          );
        case PromMetricType.gauge:
          return getOrCreateGaugeProvider(
            value.configuration,
            value.registryName
          );
        case PromMetricType.histogram:
          return getOrCreateHistogramProvider(
            value.configuration,
            value.registryName
          );
        case PromMetricType.summary:
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
      providers: providers,
    };
  }

  static forCounter(
    configuration: CounterConfiguration<string>,
    registryName?: string
  ): DynamicModule {
    return this.forMetrics([
      {
        configuration,
        metricType: PromMetricType.counter,
        registryName,
      },
    ]);
  }

  static forGauge(
    configuration: GaugeConfiguration<string>,
    registryName?: string
  ): DynamicModule {
    return this.forMetrics([
      {
        configuration,
        metricType: PromMetricType.gauge,
        registryName,
      },
    ]);
  }

  static forHistogram(
    configuration: HistogramConfiguration<string>,
    registryName?: string
  ): DynamicModule {
    return this.forMetrics([
      {
        configuration,
        metricType: PromMetricType.histogram,
        registryName,
      },
    ]);
  }

  static forSummary(
    configuration: SummaryConfiguration<string>,
    registryName?: string
  ): DynamicModule {
    return this.forMetrics([
      {
        configuration,
        metricType: PromMetricType.summary,
        registryName,
      },
    ]);
  }

  static forRoot(options: PromModuleOptions = {}): DynamicModule {
    return {
      imports: [PromCoreModule.forRoot(options)],
      module: PromModule,
    };
  }

  static forRootAsync(options: PromModuleAsyncOptions = {}): DynamicModule {
    return {
      imports: [PromCoreModule.forRootAsync(options)],
      module: PromModule,
    };
  }
}
