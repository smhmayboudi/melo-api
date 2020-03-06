import { HttpService } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { of } from "rxjs";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataSearchService } from "./data.search.service";
import { DataSearchType } from "./data.search.type";
import { DataSearchQueryReqDto } from "./dto/req/data.search.query.req.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "./dto/res/data.search.res.dto";

describe("DataSearchService", () => {
  const searchResult: DataSearchResDto = {
    type: DataSearchType.album
  };
  const searchPagination: DataPaginationResDto<DataSearchResDto> = {
    results: [searchResult],
    total: 1
  } as DataPaginationResDto<DataSearchResDto>;
  const observable = {
    status: 0,
    statusText: "",
    headers: "",
    config: {}
  };
  const dataPaginationObservable = {
    data: searchPagination,
    ...observable
  };
  const dataObservable = {
    data: searchResult,
    ...observable
  };
  // TODO: interface ?
  const searchHttpServiceMock = {
    get: (): any => dataObservable
  };
  const dataConfigServiceMock: DataConfigServiceInterface = {
    timeout: 0,
    url: ""
  };

  let dataSearchService: DataSearchService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSearchService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: searchHttpServiceMock }
      ]
    }).compile();
    dataSearchService = module.get<DataSearchService>(DataSearchService);
    httpService = module.get<HttpService>(HttpService);
  });

  it("should be defined", () => {
    expect(dataSearchService).toBeDefined();
  });

  it("query should return a list of search results", async () => {
    const dto: DataSearchQueryReqDto = {
      from: 0,
      limit: 0,
      query: ""
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(dataPaginationObservable));
    expect(await dataSearchService.query(dto)).toEqual(searchPagination);
  });
});
