import { HttpService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataConfigService } from "../data/data.config.service";
import { DataSearchService } from "../data/data.search.service";
import { SearchService } from "./search.service";

describe("SearchService", () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        DataConfigService,
        DataSearchService,
        HttpService,
        SearchService
      ]
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("mood");
  test.todo("query");
});
