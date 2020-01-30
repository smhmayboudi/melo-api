import { Test, TestingModule } from "@nestjs/testing";
import { DataSearchService } from "../data/data.search.service";
import { SearchService } from "./search.service";

describe("SearchService", () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSearchService, SearchService]
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("mood");
  test.todo("query");
});
