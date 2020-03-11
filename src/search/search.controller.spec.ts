import { Test, TestingModule } from "@nestjs/testing";
import { DataSearchType } from "../data/data.search.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { SearchServiceInterface } from "./search.service.interface";

describe("SearchController", () => {
  const search: DataSearchResDto = {
    type: DataSearchType.album
  };
  const searchPagination: DataPaginationResDto<DataSearchResDto> = {
    results: [search],
    total: 1
  } as DataPaginationResDto<DataSearchResDto>;

  const searchServiceMock: SearchServiceInterface = {
    query: (): Promise<DataPaginationResDto<DataSearchResDto>> =>
      Promise.resolve(searchPagination)
  };

  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [{ provide: SearchService, useValue: searchServiceMock }]
    }).compile();
    controller = module.get<SearchController>(SearchController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("query should be equal to a list of search results", async () => {
    const dto: SearchQueryReqDto = {
      from: 0,
      limit: 0,
      query: "0"
    };
    expect(await controller.query(dto)).toEqual(searchPagination);
  });
});
