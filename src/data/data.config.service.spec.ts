import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";

describe("DataService", () => {
  let service: DataConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [DataConfigService]
    }).compile();

    service = module.get<DataConfigService>(DataConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("timeout");
  test.todo("url");
});
