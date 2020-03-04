import { Test, TestingModule } from "@nestjs/testing";
import { DataSearchService } from "../data/data.search.service";
import { DataSearchType } from "../data/data.search.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { SearchService } from "./search.service";

describe("SearchService", () => {
  const search: DataSearchResDto = {
    type: DataSearchType.album
  };
  const searchPagination: DataPaginationResDto<DataSearchResDto> = {
    results: [search],
    total: 1
  } as DataPaginationResDto<DataSearchResDto>;
  const dataSearchServiceMock = {
    query: (): DataPaginationResDto<DataSearchResDto> => searchPagination
  };

  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: DataSearchService, useValue: dataSearchServiceMock }
      ]
    }).compile();
    service = module.get<SearchService>(SearchService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("query should return a list of search results", async () => {
    const req = {
      from: 0,
      limit: 0,
      query: ""
    };
    expect(await service.query(req)).toBe(searchPagination);
  });
});
