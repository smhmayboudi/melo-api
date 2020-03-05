import { Test, TestingModule } from "@nestjs/testing";
import { SearchCacheOptionsFactory } from "./search.cache.options.factory";
import { SearchConfigService } from "./search.config.service";
import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";

describe("SearchCacheOptionsFactory", () => {
  let service: SearchConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const searchConfigServiceMock = {
        cacheHost: "",
        cacheMax: 0,
        cachePort: 0,
        cacheStore: "",
        cacheTTL: 0
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: SearchConfigService,
            useValue: searchConfigServiceMock
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<SearchConfigService>(SearchConfigService);
    });

    it("should be defined", () => {
      expect(new SearchCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be defined", () => {
      expect(
        new SearchCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });

  describe("cacheStore none", () => {
    beforeEach(async () => {
      const searchConfigServiceMock = {
        cacheHost: "",
        cacheMax: 0,
        cachePort: 0,
        cacheStore: "none",
        cacheTTL: 0
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: SearchConfigService,
            useValue: searchConfigServiceMock
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<SearchConfigService>(SearchConfigService);
    });

    it("createCacheOptions should be defined with store none", () => {
      expect(
        new SearchCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });
});
