import {
  Counter,
  CounterConfiguration,
  Gauge,
  GaugeConfiguration,
  Histogram,
  HistogramConfiguration,
  Summary,
  SummaryConfiguration,
} from "prom-client";
import {
  getOrCreateCounter,
  getOrCreateGauge,
  getOrCreateHistogram,
  getOrCreateSummary,
} from "./prom.util";

import { Injectable } from "@nestjs/common";
import { PromServiceInterface } from "./prom.service.interface";

@Injectable()
export class PromService implements PromServiceInterface {
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
