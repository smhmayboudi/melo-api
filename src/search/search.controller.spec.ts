import { Test, TestingModule } from "@nestjs/testing";
import { DataSearchService } from "../data/data.search.service";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

describe("SearchController", () => {
  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSearchService, SearchService],
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
