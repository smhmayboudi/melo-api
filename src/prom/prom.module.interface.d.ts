import { Type } from "@nestjs/common";
import { ModuleMetadata } from "@nestjs/common/interfaces";
import {
  CounterConfiguration,
  DefaultMetricsCollectorConfiguration,
  GaugeConfiguration,
  HistogramConfiguration,
  SummaryConfiguration
} from "prom-client";
import { MetricType } from "./prom.util";

export interface MetricTypeConfigurationInterface {
  metricType: MetricType;
  configuration:
    | CounterConfiguration<string>
    | GaugeConfiguration<string>
    | HistogramConfiguration<string>
    | SummaryConfiguration<string>;
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
