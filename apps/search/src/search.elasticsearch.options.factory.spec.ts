import { SearchConfigService } from "./search.config.service";
import { SearchConfigServiceInterface } from "./search.config.service.interface";
import { SearchElasticsearchOptionsFactory } from "./search.elasticsearch.options.factory";
import { Test } from "@nestjs/testing";

describe("SearchElasticsearchOptionsFactory", () => {
  const searchConfigServiceMock: SearchConfigServiceInterface = {
    elasticsearchNode: "",
    indexName: "",
    maxSize: 0,
    scriptScore: "",
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
    suggestIndex: "",
  };

  let service: SearchConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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

  it("createSentryOptions should be equal to a value", () => {
    expect(
      new SearchElasticsearchOptionsFactory(
        service
      ).createElasticsearchOptions()
    ).toEqual({
      node: "",
    });
  });
});
