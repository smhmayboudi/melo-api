import { Test, TestingModule } from "@nestjs/testing";

import { APP_CACHE_STORE_NONE } from "@melo/common";
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
            provide: RelationConfigService,
            useValue: relationConfigServiceMock,
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

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RelationConfigService,
          useValue: {
            ...relationConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<RelationConfigService>(RelationConfigService);

    expect(
      new RelationCacheOptionsFactory(service).createCacheOptions()
    ).toEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
