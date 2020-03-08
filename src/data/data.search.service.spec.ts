import { HttpService } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { of } from "rxjs";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataSearchService } from "./data.search.service";
import { DataSearchType } from "./data.search.type";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "./dto/res/data.search.res.dto";

describe("DataSearchService", () => {
  let dataSearchService: DataSearchService;
  let httpService: HttpService;

  const dataConfigServiceMock: DataConfigServiceInterface = {
    timeout: 0
  };
  const data = {
    type: DataSearchType.album
  };
  // TODO: interface ?
  const searchHttpServiceMock = {
    get: () => ({
      config: {},
      data,
      headers: "",
      status: 0,
      statusText: ""
    })
  };

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
    const req = {
      from: 0,
      limit: 0,
      query: ""
    };
    const res = {
      results: [
        {
          type: DataSearchType.album
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSearchResDto>;

    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(searchHttpServiceMock.get()));
    expect(await dataSearchService.query(req)).toEqual(res);
  });
});
