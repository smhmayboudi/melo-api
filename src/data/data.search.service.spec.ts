import { HttpService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataConfigService } from "./data.config.service";
import { DataSearchService } from "./data.search.service";

describe("DataSearchService", () => {
  let service: DataSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        DataConfigService,
        DataSearchService,
        HttpService
      ]
    }).compile();

    service = module.get<DataSearchService>(DataSearchService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("query");
  test.todo("mood");
});
