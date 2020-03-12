import { Test, TestingModule } from "@nestjs/testing";
import { Counter, Gauge, Histogram, Summary } from "prom-client";
import { PromService } from "./prom.service";

describe("PromService", () => {
  let service: PromService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromService]
    }).compile();
    service = module.get<PromService>(PromService);
  });

  it("getOrCreateCounter should be instance of a counter metric", () => {
    expect(
      service.getOrCreateCounter({ name: "counter", help: "counter" })
    ).toBeInstanceOf(Counter);
  });

  it("getOrCreateGauge should be instance of a gauge metric", () => {
    expect(
      service.getOrCreateGauge({ name: "gauge", help: "gauge" })
    ).toBeInstanceOf(Gauge);
  });

  it("getOrCreateHistogram should be instance of a histogram metric", () => {
    expect(
      service.getOrCreateHistogram({ name: "histogram", help: "histogram" })
    ).toBeInstanceOf(Histogram);
  });

  it("getOrCreateSummary should be instance of a summary metric", () => {
    expect(
      service.getOrCreateSummary({ name: "summary", help: "summary" })
    ).toBeInstanceOf(Summary);
  });
});
