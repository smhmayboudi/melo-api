import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { RelationCacheOptionsFactory } from "./relation.cache.options.factory";
import { RelationConfigService } from "./relation.config.service";
import { RelationConfigServiceInterface } from "./relation.config.service.interface";

describe("RelationCacheOptionsFactory", () => {
  const relationConfigServiceMock: RelationConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: RelationConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: RelationConfigService,
            useValue: relationConfigServiceMock,
          },
          {
            provide: ConfigService,
            useValue: {},
          },
        ],
      }).compile();
      service = module.get<RelationConfigService>(RelationConfigService);
    });

    it("should be defined", () => {
      expect(new RelationCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be equal to an option", () => {
      expect(
        new RelationCacheOptionsFactory(service).createCacheOptions()
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
            provide: RelationConfigService,
            useValue: { ...relationConfigServiceMock, cacheStore: "none" },
          },
          {
            provide: ConfigService,
            useValue: {},
          },
        ],
      }).compile();
      service = module.get<RelationConfigService>(RelationConfigService);
    });

    it("createCacheOptions should be equal to an option with store none", () => {
      expect(
        new RelationCacheOptionsFactory(service).createCacheOptions()
      ).toEqual({
        host: "",
        max: 0,
        port: 0,
        store: "none",
        ttl: 0,
      });
    });
  });
});
