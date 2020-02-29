import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataSearchService } from "../data/data.search.service";
import { DataSearchType } from "../data/data.search.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { AppModule } from "../app/app.module";
import config from "./search.config";
import { SearchConfigService } from "./search.config.service";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

describe("SearchController", () => {
  let controller: SearchController;
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
      controllers: [SearchController],
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        SearchConfigService,
        SearchService,
        { provide: DataSearchService, useValue: dataSearchServiceMock }
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
    const res = {
      results: [
        {
          type: DataSearchType.album
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSearchResDto>;
    jest.spyOn(service, "query").mockImplementation(() => Promise.resolve(res));

    expect(await controller.query(req)).toBe(res);
  });
});
