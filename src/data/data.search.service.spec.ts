import { HttpModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataHttpModuleOptionsFactory } from "./data.http.options.factory";
import { DataModule } from "./data.module";
import { DataSearchService } from "./data.search.service";

describe("DataSearchService", () => {
  let service: DataSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(config),
        HttpModule.registerAsync({
          imports: [DataModule],
          useClass: DataHttpModuleOptionsFactory
        })
      ],
      providers: [DataConfigService, DataSearchService]
    }).compile();

    service = module.get<DataSearchService>(DataSearchService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("query");
});
