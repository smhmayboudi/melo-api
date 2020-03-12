import { Test, TestingModule } from "@nestjs/testing";
import { Counter, Gauge, Histogram, register, Summary } from "prom-client";
import {
  getOrCreateCounterProvider,
  getOrCreateGaugeProvider,
  getOrCreateHistogramProvider,
  getOrCreateSummaryProvider
} from "./prom.provider";
import {
  getTokenCounter,
  getTokenGauge,
  getTokenHistogram,
  getTokenRegistry,
  getTokenSummary
} from "./prom.util";

describe("PromProvider", () => {
  it("getOrCreateCounterProvider should be instance of counter", async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        getOrCreateCounterProvider({ name: "counter", help: "counter" }),
        { provide: getTokenRegistry(), useValue: register }
      ]
    }).compile();
    expect(module.get(getTokenCounter("counter"))).toBeInstanceOf(Counter);
  });

  it("getOrCreateGaugeProvider should be instance of gauge", async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        getOrCreateGaugeProvider({ name: "gauge", help: "gauge" }),
        { provide: getTokenRegistry(), useValue: register }
      ]
    }).compile();
    expect(module.get(getTokenGauge("gauge"))).toBeInstanceOf(Gauge);
  });

  it("getOrCreateHistogramProvider should be instance of gauge", async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        getOrCreateHistogramProvider({ name: "histogram", help: "histogram" }),
        { provide: getTokenRegistry(), useValue: register }
      ]
    }).compile();
    expect(module.get(getTokenHistogram("histogram"))).toBeInstanceOf(
      Histogram
    );
  });

  it("getOrCreateSummaryProvider should be instance of gauge", async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        getOrCreateSummaryProvider({ name: "summary", help: "summary" }),
        { provide: getTokenRegistry(), useValue: register }
      ]
    }).compile();
    expect(module.get(getTokenSummary("summary"))).toBeInstanceOf(Summary);
  });
});
