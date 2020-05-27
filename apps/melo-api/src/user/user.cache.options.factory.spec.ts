import { Test, TestingModule } from "@nestjs/testing";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { UserCacheOptionsFactory } from "./user.cache.options.factory";
import { UserConfigService } from "./user.config.service";
import { UserConfigServiceInterface } from "./user.config.service.interface";

describe("UserCacheOptionsFactory", () => {
  const userConfigServiceMock: UserConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: UserConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: UserConfigService,
            useValue: userConfigServiceMock,
          },
        ],
      }).compile();
      service = module.get<UserConfigService>(UserConfigService);
    });

    it("should be defined", () => {
      expect(new UserCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be equal to an option", () => {
      expect(
        new UserCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserConfigService,
          useValue: {
            ...userConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<UserConfigService>(UserConfigService);

    expect(new UserCacheOptionsFactory(service).createCacheOptions()).toEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
