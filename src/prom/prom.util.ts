import {
  Counter,
  CounterConfiguration,
  Gauge,
  GaugeConfiguration,
  Histogram,
  HistogramConfiguration,
  Metric,
  register,
  Summary,
  SummaryConfiguration
} from "prom-client";
import {
  PROM_CONFIGURATION_DEFAULT,
  PROM_CONFIGURATION_NAME,
  // PROM_CONFIGURATION,
  PROM_METRIC,
  PROM_REGISTRY_DEFAULT,
  PROM_REGISTRY_NAME
} from "./prom.constant";

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

function getToken(metricType: MetricType, name: string): string {
  return `${PROM_METRIC}_${metricType
    .toString()
    .toUpperCase()}_${name.toUpperCase()}`;
}

export function getTokenCounter(name: string): string {
  return getToken(MetricType.Counter, name);
}

export function getTokenGauge(name: string): string {
  return getToken(MetricType.Gauge, name);
}
export function getTokenHistogram(name: string): string {
  return getToken(MetricType.Histogram, name);
}
export function getTokenSummary(name: string): string {
  return getToken(MetricType.Summary, name);
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
