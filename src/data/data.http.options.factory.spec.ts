import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataHttpModuleOptionsFactory } from "./data.http.options.factory";

describe("DataHttpModuleOptionsFactory", () => {
  let service: DataConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [DataConfigService]
    }).compile();
    service = module.get<DataConfigService>(DataConfigService);
  });

  it("should be defined", () => {
    expect(new DataHttpModuleOptionsFactory(service)).toBeDefined();
  });
});
