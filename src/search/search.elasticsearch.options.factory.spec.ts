import { Test, TestingModule } from "@nestjs/testing";

import { SearchConfigService } from "./search.config.service";
import { SearchConfigServiceInterface } from "./search.config.service.interface";
import { SearchElasticsearchOptionsFactory } from "./search.elasticsearch.options.factory";

describe("SearchElasticsearchOptionsFactory", () => {
  const searchConfigServiceMock: SearchConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    elasticNode: "",
    elasticScriptScore: "",
    index: "",
    resultSize: 0,
    suggestIndex: "",
  };

  let service: SearchConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SearchConfigService,
          useValue: searchConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<SearchConfigService>(SearchConfigService);
  });

  it("should be defined", () => {
    expect(new SearchElasticsearchOptionsFactory(service)).toBeDefined();
  });

  it("createElasticsearchOptions should return an option", () => {
    expect(
      new SearchElasticsearchOptionsFactory(
        service
      ).createElasticsearchOptions()
    ).toBeDefined();
  });
});
