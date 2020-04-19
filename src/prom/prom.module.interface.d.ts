import {
  CounterConfiguration,
  DefaultMetricsCollectorConfiguration,
  GaugeConfiguration,
  HistogramConfiguration,
  SummaryConfiguration,
} from "prom-client";

import { ModuleMetadata } from "@nestjs/common/interfaces";
import { PromMetricType } from "./prom.metric.type";
import { Type } from "@nestjs/common";

export interface MetricTypeConfigurationInterface {
  configuration:
    | CounterConfiguration<string>
    | GaugeConfiguration<string>
    | HistogramConfiguration<string>
    | SummaryConfiguration<string>;
  metricType: PromMetricType;
  registryName?: string;
}
export interface PromModuleOptions {
  defaultLabels?: Record<string, string>;
  defaultMetrics?: {
    config?: DefaultMetricsCollectorConfiguration;
    enabled: boolean;
  };
  ignorePaths?: string[];
  path?: string;
  prefix?: string;
  registryName?: string;
}
export interface PromOptionsFactory {
  createPromOptions(): Promise<PromModuleOptions> | PromModuleOptions;
}
export interface PromModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  registryName?: string;
  useClass?: Type<PromOptionsFactory>;
  useExisting?: Type<PromOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<PromModuleOptions> | PromModuleOptions;
}
