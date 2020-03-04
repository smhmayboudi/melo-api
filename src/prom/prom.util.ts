import { PATH_METADATA } from "@nestjs/common/constants";
import {
  collectDefaultMetrics,
  Counter,
  CounterConfiguration,
  Gauge,
  GaugeConfiguration,
  Histogram,
  HistogramConfiguration,
  Metric,
  register,
  Registry,
  Summary,
  SummaryConfiguration
} from "prom-client";
import { PATH_HEALTH, PATH_METRICS } from "../app/app.constant";
import {
  PROM_CONFIGURATION_DEFAULT,
  PROM_CONFIGURATION_NAME,
  PROM_METRIC,
  PROM_REGISTRY_DEFAULT,
  PROM_REGISTRY_NAME
} from "./prom.constant";
import { PromController } from "./prom.controller";
import { PromModuleOptions } from "./prom.module.interface";

export const enum MetricType {
  Counter = "Counter",
  Gauge = "Gauge",
  Histogram = "Histogram",
  Summary = "Summary"
}

function getOrCreateMetric(
  metricType: MetricType,
  configuration:
    | CounterConfiguration<string>
    | GaugeConfiguration<string>
    | HistogramConfiguration<string>
    | SummaryConfiguration<string>
): Metric<string> {
  const existingMetric = register.getSingleMetric(configuration.name);
  if (existingMetric === undefined) {
    switch (metricType) {
      case MetricType.Counter:
        return new Counter(configuration);
      case MetricType.Gauge:
        return new Gauge(configuration);
      case MetricType.Histogram:
        return new Histogram(configuration);
      case MetricType.Summary:
        return new Summary(configuration);
      default:
        throw new ReferenceError(`The type ${metricType} is not supported.`);
    }
  }
  return existingMetric;
}

export function getOrCreateCounter(
  configuration: CounterConfiguration<string>
): Counter<string> {
  return getOrCreateMetric(MetricType.Counter, configuration) as Counter<
    string
  >;
}

export function getOrCreateGauge(
  configuration: GaugeConfiguration<string>
): Gauge<string> {
  return getOrCreateMetric(MetricType.Gauge, configuration) as Gauge<string>;
}

export function getOrCreateHistogram(
  configuration: HistogramConfiguration<string>
): Histogram<string> {
  return getOrCreateMetric(MetricType.Histogram, configuration) as Histogram<
    string
  >;
}

export function getOrCreateSummary(
  configuration: SummaryConfiguration<string>
): Summary<string> {
  return getOrCreateMetric(MetricType.Summary, configuration) as Summary<
    string
  >;
}

function getTokenMetric(metricType: MetricType, name: string): string {
  return `${PROM_METRIC}_${metricType
    .toString()
    .toUpperCase()}_${name.toUpperCase()}`;
}

export function getTokenCounter(name: string): string {
  return getTokenMetric(MetricType.Counter, name);
}

export function getTokenGauge(name: string): string {
  return getTokenMetric(MetricType.Gauge, name);
}
export function getTokenHistogram(name: string): string {
  return getTokenMetric(MetricType.Histogram, name);
}
export function getTokenSummary(name: string): string {
  return getTokenMetric(MetricType.Summary, name);
}

export function getTokenConfiguration(name?: string): string {
  return name === undefined
    ? PROM_CONFIGURATION_DEFAULT
    : `${PROM_CONFIGURATION_NAME}_${name.toUpperCase()}`;
}

export function getTokenRegistry(name?: string): string {
  return name === undefined
    ? PROM_REGISTRY_DEFAULT
    : `${PROM_REGISTRY_NAME}_${name.toUpperCase()}`;
}

export function makeDefaultOptions(
  options?: PromModuleOptions
): PromModuleOptions {
  return {
    defaultLabels:
      options === undefined || options.defaultLabels === undefined
        ? {}
        : options.defaultLabels,
    defaultMetrics: {
      config:
        options === undefined ||
        options.defaultMetrics === undefined ||
        options.defaultMetrics.config === undefined
          ? {}
          : options.defaultMetrics.config,
      enabled:
        options === undefined || options.defaultMetrics === undefined
          ? true
          : options.defaultMetrics.enabled
    },
    ignorePaths:
      options === undefined || options.ignorePaths === undefined
        ? [PATH_HEALTH, PATH_METRICS]
        : options.ignorePaths,
    path:
      options === undefined || options.path === undefined
        ? PATH_METRICS
        : options.path,
    prefix:
      options === undefined || options.prefix === undefined
        ? ""
        : options.prefix,
    registryName:
      options === undefined || options.registryName === undefined
        ? undefined
        : options.registryName
  };
}

export function promConfigurationProviderImp(
  options: PromModuleOptions,
  promConfigurationName: string
): void {
  let path = PATH_METRICS;
  if (promConfigurationName !== PROM_CONFIGURATION_DEFAULT) {
    path = options.path || PATH_METRICS;
  }
  Reflect.defineMetadata(PATH_METADATA, path, PromController);
}

export function promRegistryProviderImp(
  options: PromModuleOptions,
  promRegistryName: string
): Registry {
  let registry = register;
  if (promRegistryName !== PROM_REGISTRY_DEFAULT) {
    registry = new Registry();
  }
  register.setDefaultLabels({ ...options.defaultLabels });
  if (options.defaultMetrics?.enabled !== false) {
    const defaultMetricsOptions = {
      ...options.defaultMetrics?.config,
      register: registry
    };
    collectDefaultMetrics(defaultMetricsOptions);
  }
  return registry;
}
