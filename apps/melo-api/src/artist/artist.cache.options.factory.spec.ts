import { Test, TestingModule } from "@nestjs/testing";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { ArtistCacheOptionsFactory } from "./artist.cache.options.factory";
import { ArtistConfigService } from "./artist.config.service";
import { ArtistConfigServiceInterface } from "./artist.config.service.interface";

describe("ArtistCacheOptionsFactory", () => {
  const artistConfigServiceMock: ArtistConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    maxSize: 0,
  };

  let service: ArtistConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: ArtistConfigService,
            useValue: artistConfigServiceMock,
          },
        ],
      }).compile();
      service = module.get<ArtistConfigService>(ArtistConfigService);
    });

    it("should be defined", () => {
      expect(new ArtistCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be equal to an option", () => {
      expect(
        new ArtistCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ArtistConfigService,
          useValue: {
            ...artistConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<ArtistConfigService>(ArtistConfigService);

    expect(new ArtistCacheOptionsFactory(service).createCacheOptions()).toEqual(
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
