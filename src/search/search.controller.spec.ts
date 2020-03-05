import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { DataSearchService } from "../data/data.search.service";
import { DataSearchType } from "../data/data.search.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { SearchConfigService } from "./search.config.service";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

describe("SearchController", () => {
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

  let controller: SearchController;
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: AppConfigService,
          useValue: {}
        },
        {
          provide: ConfigService,
          useValue: {}
        },
        { provide: DataSearchService, useValue: dataSearchServiceMock },
        SearchConfigService,
        SearchService
      ]
    }).compile();
    controller = module.get<SearchController>(SearchController);
    service = module.get<SearchService>(SearchService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
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
