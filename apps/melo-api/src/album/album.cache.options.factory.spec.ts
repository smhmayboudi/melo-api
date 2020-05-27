import { Test, TestingModule } from "@nestjs/testing";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { AlbumCacheOptionsFactory } from "./album.cache.options.factory";
import { AlbumConfigService } from "./album.config.service";
import { AlbumConfigServiceInterface } from "./album.config.service.interface";

describe("AlbumCacheOptionsFactory", () => {
  const albumConfigServiceMock: AlbumConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: AlbumConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AlbumConfigService,
            useValue: albumConfigServiceMock,
          },
        ],
      }).compile();
      service = module.get<AlbumConfigService>(AlbumConfigService);
    });

    it("should be defined", () => {
      expect(new AlbumCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be equal to an option", () => {
      expect(
        new AlbumCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AlbumConfigService,
          useValue: {
            ...albumConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<AlbumConfigService>(AlbumConfigService);

    expect(new AlbumCacheOptionsFactory(service).createCacheOptions()).toEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
