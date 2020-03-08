import { Test, TestingModule } from "@nestjs/testing";
import { DataConfigService } from "./data.config.service";

describe("DataService", () => {
  let service: DataConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataConfigService]
    }).compile();
    service = module.get<DataConfigService>(DataConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("timeout should be defined", () => {
    expect(service.timeout).toBeDefined();
  });

  it("url should be defined", () => {
    expect(service.url).toBeDefined();
  });
});
