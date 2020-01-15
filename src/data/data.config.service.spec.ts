import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataConfigService } from "./data.config.service";

describe("DataService", () => {
  let service: DataConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, DataConfigService]
    }).compile();

    service = module.get<DataConfigService>(DataConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("timeout");
  test.todo("uri");
});
