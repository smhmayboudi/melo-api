import { Test, TestingModule } from "@nestjs/testing";

import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchService } from "../data/data.search.service";
import { DataSearchServiceInterface } from "../data/data.search.service.interface";
import { DataSearchType } from "../data/data.search.type";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchService } from "./search.service";

describe("SearchService", () => {
  const search: DataSearchResDto = {
    type: DataSearchType.album
  };
  const searchPagination: DataPaginationResDto<DataSearchResDto> = {
    results: [search],
    total: 1
  } as DataPaginationResDto<DataSearchResDto>;

  const dataSearchServiceMock: DataSearchServiceInterface = {
    query: (): Promise<DataPaginationResDto<DataSearchResDto>> =>
      Promise.resolve(searchPagination)
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

  it("query should be equal to a list of search results", async () => {
    const dto: SearchQueryReqDto = {
      from: 0,
      limit: 0,
      query: ""
    };
    expect(await service.query(dto)).toEqual(searchPagination);
  });
});
