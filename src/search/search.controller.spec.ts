import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataConfigService } from "../data/data.config.service";
import { DataSearchService } from "../data/data.search.service";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

describe("SearchController", () => {
  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        DataConfigService,
        DataSearchService,
        SearchService
      ],
      controllers: [SearchController]
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("mood");
  test.todo("query");
});
