import { Injectable } from "@nestjs/common";
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
import {
  getOrCreateCounter,
  getOrCreateGauge,
  getOrCreateHistogram,
  getOrCreateSummary
} from "./prom.util";

@Injectable()
export class PromService {
  getOrCreateCounter(
    configuration: CounterConfiguration<string>
  ): Counter<string> {
    return getOrCreateCounter(configuration);
  }

  getOrCreateGauge(configuration: GaugeConfiguration<string>): Gauge<string> {
    return getOrCreateGauge(configuration);
  }

  getOrCreateHistogram(
    configuration: HistogramConfiguration<string>
  ): Histogram<string> {
    return getOrCreateHistogram(configuration);
  }

  getOrCreateSummary(
    configuration: SummaryConfiguration<string>
  ): Summary<string> {
    return getOrCreateSummary(configuration);
  }
}
