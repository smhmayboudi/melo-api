import { Provider } from "@nestjs/common";
import {
  Counter,
  CounterConfiguration,
  Gauge,
  GaugeConfiguration,
  Histogram,
  HistogramConfiguration,
  Registry,
  Summary,
  SummaryConfiguration
} from "prom-client";
import {
  getOrCreateCounter,
  getOrCreateGauge,
  getOrCreateHistogram,
  getOrCreateSummary,
  getTokenCounter,
  getTokenGauge,
  getTokenHistogram,
  getTokenRegistry,
  getTokenSummary
} from "./prom.util";

export function createCounterProvider(
  configuration: CounterConfiguration<string>,
  registryName?: string
): Provider<Counter<string>> {
  return {
    inject: [getTokenRegistry(registryName)],
    provide: getTokenCounter(configuration.name),
    useFactory(registry: Registry): Counter<string> {
      return getOrCreateCounter({
        ...configuration,
        registers: [registry]
      });
    }
  };
}

export function createGaugeProvider(
  configuration: GaugeConfiguration<string>,
  registryName?: string
): Provider<Gauge<string>> {
  return {
    inject: [getTokenRegistry(registryName)],
    provide: getTokenGauge(configuration.name),
    useFactory(registry: Registry): Gauge<string> {
      return getOrCreateGauge({
        ...configuration,
        registers: [registry]
      });
    }
  };
}

export function createHistogramProvider(
  configuration: HistogramConfiguration<string>,
  registryName?: string
): Provider<Histogram<string>> {
  return {
    inject: [getTokenRegistry(registryName)],
    provide: getTokenHistogram(configuration.name),
    useFactory(registry: Registry): Histogram<string> {
      return getOrCreateHistogram({
        ...configuration,
        registers: [registry]
      });
    }
  };
}

export function createSummaryProvider(
  configuration: SummaryConfiguration<string>,
  registryName?: string
): Provider<Summary<string>> {
  return {
    inject: [getTokenRegistry(registryName)],
    provide: getTokenSummary(configuration.name),
    useFactory(registry: Registry): Summary<string> {
      return getOrCreateSummary({
        ...configuration,
        registers: [registry]
      });
    }
  };
}
