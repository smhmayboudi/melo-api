import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataSearchService } from "../data/data.search.service";
import { DataSearchType } from "../data/data.search.type";
import { AppModule } from "../app/app.module";
import config from "./search.config";
import { SearchService } from "./search.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";

describe("SearchService", () => {
  let service: SearchService;

  const dataSearchServiceMock = jest.fn(() => ({
    query: {
      results: [
        {
          type: DataSearchType.album
        }
      ],
      total: 1
    }
  }));
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
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
