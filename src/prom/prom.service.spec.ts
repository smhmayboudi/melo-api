import { Test, TestingModule } from "@nestjs/testing";
import { PromService } from "./prom.service";

describe("PromService", () => {
  let service: PromService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromService]
    }).compile();
    service = module.get<PromService>(PromService);
  });

  it("getOrCreateCounter should be defined", () => {
    expect(
      service.getOrCreateCounter({ name: "name", help: "help" })
    ).toBeDefined();
  });

  it("getOrCreateGauge should be defined", () => {
    expect(
      service.getOrCreateGauge({ name: "name", help: "help" })
    ).toBeDefined();
  });

  it("getOrCreateHistogram should be defined", () => {
    expect(
      service.getOrCreateHistogram({ name: "name", help: "help" })
    ).toBeDefined();
  });

  it("getOrCreateSummary should be defined", () => {
    expect(
      service.getOrCreateSummary({ name: "name", help: "help" })
    ).toBeDefined();
  });
});
