import { APP_CACHE_STORE_NONE } from "@melo/common";
import { SearchCacheOptionsFactory } from "./search.cache.options.factory";
import { SearchConfigService } from "./search.config.service";
import { SearchConfigServiceInterface } from "./search.config.service.interface";
import { Test } from "@nestjs/testing";

describe("SearchCacheOptionsFactory", () => {
  const searchConfigServiceMock: SearchConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
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
    expect(new SearchCacheOptionsFactory(service)).toBeDefined();
  });

  it("createCacheOptions should be equal to an option", () => {
    expect(
      new SearchCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: SearchConfigService,
          useValue: {
            ...searchConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<SearchConfigService>(SearchConfigService);

    expect(new SearchCacheOptionsFactory(service).createCacheOptions()).toEqual(
      {
        host: "",
        max: 0,
        port: 0,
        store: APP_CACHE_STORE_NONE,
        ttl: 0,
      }
    );
  });
});
