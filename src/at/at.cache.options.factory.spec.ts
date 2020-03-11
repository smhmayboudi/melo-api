import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { AtCacheOptionsFactory } from "./at.cache.options.factory";
import { AtConfigService } from "./at.config.service";
import { AtConfigServiceInterface } from "./at.config.service.interface";

describe("AtCacheOptionsFactory", () => {
  const atConfigServiceMock: AtConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0
  };

  let service: AtConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: AtConfigService,
            useValue: atConfigServiceMock
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<AtConfigService>(AtConfigService);
    });

    it("should be defined", () => {
      expect(new AtCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should equal to an option", () => {
      expect(
        new AtCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });

  describe("cacheStore none", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: AtConfigService,
            useValue: { ...atConfigServiceMock, cacheStore: "none" }
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<AtConfigService>(AtConfigService);
    });

    it("createCacheOptions should equal to an option with store none", () => {
      expect(new AtCacheOptionsFactory(service).createCacheOptions()).toEqual({
        host: "",
        max: 0,
        port: 0,
        store: "none",
        ttl: 0
      });
    });
  });
});
