import {
  Counter,
  CounterConfiguration,
  Gauge,
  GaugeConfiguration,
  Histogram,
  HistogramConfiguration,
  Summary,
  SummaryConfiguration
} from "prom-client";

export interface PromServiceInterface {
  getOrCreateCounter(
    configuration: CounterConfiguration<string>
  ): Counter<string>;
  getOrCreateGauge(configuration: GaugeConfiguration<string>): Gauge<string>;
  getOrCreateHistogram(
    configuration: HistogramConfiguration<string>
  ): Histogram<string>;
  getOrCreateSummary(
    configuration: SummaryConfiguration<string>
  ): Summary<string>;
}
