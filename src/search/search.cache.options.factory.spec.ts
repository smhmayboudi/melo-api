import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { CACHE_STORE_NONE } from "../app/app.constant";
import { ConfigService } from "@nestjs/config";
import { SearchCacheOptionsFactory } from "./search.cache.options.factory";
import { SearchConfigService } from "./search.config.service";
import { SearchConfigServiceInterface } from "./search.config.service.interface";

describe("SearchCacheOptionsFactory", () => {
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

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: ConfigService,
            useValue: {},
          },
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
  });

  describe("cacheStore none", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: ConfigService,
            useValue: {},
          },
          {
            provide: SearchConfigService,
            useValue: {
              ...searchConfigServiceMock,
              cacheStore: CACHE_STORE_NONE,
            },
          },
        ],
      }).compile();
      service = module.get<SearchConfigService>(SearchConfigService);
    });

    it("createCacheOptions should be equal to an option with store none", () => {
      expect(
        new SearchCacheOptionsFactory(service).createCacheOptions()
      ).toEqual({
        host: "",
        max: 0,
        port: 0,
        store: CACHE_STORE_NONE,
        ttl: 0,
      });
    });
  });
});
