import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataSearchService } from "./data.search.service";
import { DataSearchType } from "./data.search.type";
import { HttpService } from "@nestjs/common";
import { DataSearchResDto } from "./dto/res/data.search.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";

describe("DataSearchService", () => {
  let service: DataSearchService;

  const data = {
    type: DataSearchType.album
  };
  const searchHttpServiceMock = jest.fn(() => ({
    get: jest.fn(() => ({
      data,
      status: 0,
      statusText: "",
      headers: "",
      config: {}
    }))
  }));

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSearchService,
        { provide: HttpService, useValue: searchHttpServiceMock }
      ]
    }).compile();
    service = module.get<DataSearchService>(DataSearchService);
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
    const res = {
      results: [
        {
          type: DataSearchType.album
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSearchResDto>;
    jest.spyOn(service, "query").mockImplementation(() => Promise.resolve(res));

    expect(await service.query(req)).toBe(res);
  });
});
