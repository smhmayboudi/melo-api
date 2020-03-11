import { HttpService } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AxiosResponse } from "axios";
import { Observable, of } from "rxjs";
import { DataConfigService } from "./data.config.service";
import { DataSearchService } from "./data.search.service";
import { DataSearchType } from "./data.search.type";
import { DataSearchQueryReqDto } from "./dto/req/data.search.query.req.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "./dto/res/data.search.res.dto";

describe("DataSearchService", () => {
  const dataSearchResDto: DataSearchResDto = {
    type: DataSearchType.album
  };
  const searchPagination: DataPaginationResDto<DataSearchResDto> = {
    results: [dataSearchResDto],
    total: 1
  } as DataPaginationResDto<DataSearchResDto>;

  // TODO: interface ?
  const httpServiceMock = {
    get: (): Observable<
      AxiosResponse<DataPaginationResDto<DataSearchResDto>>
    > =>
      of({
        config: {},
        data: searchPagination,
        headers: {},
        status: 200,
        statusText: ""
      })
  };

  let service: DataSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSearchService,
        { provide: DataConfigService, useValue: {} },
        { provide: HttpService, useValue: httpServiceMock }
      ]
    }).compile();
    service = module.get<DataSearchService>(DataSearchService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("query should be equal to a list of search results", async () => {
    const dto: DataSearchQueryReqDto = {
      from: 0,
      limit: 0,
      query: ""
    };
    expect(await service.query(dto)).toEqual(searchPagination);
  });
});
