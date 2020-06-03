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

import { PromService } from "./prom.service";
import { Test } from "@nestjs/testing";

describe("PromService", () => {
  let service: PromService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PromService],
    }).compile();
    service = module.get<PromService>(PromService);
  });

  it("getOrCreateCounter should be instance of a counter metric", () => {
    const configuration: CounterConfiguration<string> = {
      help: "counter",
      name: "counter",
    };
    expect(service.getOrCreateCounter(configuration)).toBeInstanceOf(Counter);
  });

  it("getOrCreateGauge should be instance of a gauge metric", () => {
    const configuration: GaugeConfiguration<string> = {
      help: "gauge",
      name: "gauge",
    };
    expect(service.getOrCreateGauge(configuration)).toBeInstanceOf(Gauge);
  });

  it("getOrCreateHistogram should be instance of a histogram metric", () => {
    const configuration: HistogramConfiguration<string> = {
      help: "histogram",
      name: "histogram",
    };
    expect(service.getOrCreateHistogram(configuration)).toBeInstanceOf(
      Histogram
    );
  });

  it("getOrCreateSummary should be instance of a summary metric", () => {
    const configuration: SummaryConfiguration<string> = {
      help: "summary",
      name: "summary",
    };
    expect(service.getOrCreateSummary(configuration)).toBeInstanceOf(Summary);
  });
});
