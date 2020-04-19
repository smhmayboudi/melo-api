import { Counter, Gauge, Histogram, Summary } from "prom-client";
import { Test, TestingModule } from "@nestjs/testing";

import { PromService } from "./prom.service";

describe("PromService", () => {
  let service: PromService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromService],
    }).compile();
    service = module.get<PromService>(PromService);
  });

  it("getOrCreateCounter should be instance of a counter metric", () => {
    expect(
      service.getOrCreateCounter({ help: "counter", name: "counter" })
    ).toBeInstanceOf(Counter);
  });

  it("getOrCreateGauge should be instance of a gauge metric", () => {
    expect(
      service.getOrCreateGauge({ help: "gauge", name: "gauge" })
    ).toBeInstanceOf(Gauge);
  });

  it("getOrCreateHistogram should be instance of a histogram metric", () => {
    expect(
      service.getOrCreateHistogram({ help: "histogram", name: "histogram" })
    ).toBeInstanceOf(Histogram);
  });

  it("getOrCreateSummary should be instance of a summary metric", () => {
    expect(
      service.getOrCreateSummary({ help: "summary", name: "summary" })
    ).toBeInstanceOf(Summary);
  });
});
