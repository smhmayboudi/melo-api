import { Test, TestingModule } from "@nestjs/testing";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { SongCacheOptionsFactory } from "./song.cache.options.factory";
import { SongConfigService } from "./song.config.service";
import { SongConfigServiceInterface } from "./song.config.service.interface";

describe("SongCacheOptionsFactory", () => {
  const songConfigServiceMock: SongConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    maxSize: 0,
    sendTimeout: 0,
    sendUrl: "",
  };

  let service: SongConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: SongConfigService,
            useValue: songConfigServiceMock,
          },
        ],
      }).compile();
      service = module.get<SongConfigService>(SongConfigService);
    });

    it("should be defined", () => {
      expect(new SongCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be equal to an option", () => {
      expect(
        new SongCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SongConfigService,
          useValue: {
            ...songConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<SongConfigService>(SongConfigService);

    expect(new SongCacheOptionsFactory(service).createCacheOptions()).toEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
