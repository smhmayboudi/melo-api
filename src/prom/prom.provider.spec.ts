import { Counter, Gauge, Histogram, Summary, register } from "prom-client";
import { Test, TestingModule } from "@nestjs/testing";
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
        getOrCreateCounterProvider({ help: "counter", name: "counter" }),
        { provide: getTokenRegistry(), useValue: register }
      ]
    }).compile();
    expect(module.get(getTokenCounter("counter"))).toBeInstanceOf(Counter);
  });

  it("getOrCreateGaugeProvider should be instance of gauge", async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        getOrCreateGaugeProvider({ help: "gauge", name: "gauge" }),
        { provide: getTokenRegistry(), useValue: register }
      ]
    }).compile();
    expect(module.get(getTokenGauge("gauge"))).toBeInstanceOf(Gauge);
  });

  it("getOrCreateHistogramProvider should be instance of gauge", async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        getOrCreateHistogramProvider({ help: "histogram", name: "histogram" }),
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
        getOrCreateSummaryProvider({ help: "summary", name: "summary" }),
        { provide: getTokenRegistry(), useValue: register }
      ]
    }).compile();
    expect(module.get(getTokenSummary("summary"))).toBeInstanceOf(Summary);
  });
});
