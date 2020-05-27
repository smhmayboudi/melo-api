import { Test, TestingModule } from "@nestjs/testing";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { JwksCacheOptionsFactory } from "./jwks.cache.options.factory";
import { JwksConfigService } from "./jwks.config.service";
import { JwksConfigServiceInterface } from "./jwks.config.service.interface";

describe("JwksCacheOptionsFactory", () => {
  const jwksConfigServiceMock: JwksConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: JwksConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: JwksConfigService,
            useValue: jwksConfigServiceMock,
          },
        ],
      }).compile();
      service = module.get<JwksConfigService>(JwksConfigService);
    });

    it("should be defined", () => {
      expect(new JwksCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be equal to an option", () => {
      expect(
        new JwksCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: JwksConfigService,
          useValue: {
            ...jwksConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<JwksConfigService>(JwksConfigService);

    expect(new JwksCacheOptionsFactory(service).createCacheOptions()).toEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
