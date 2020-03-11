import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { ArtistCacheOptionsFactory } from "./artist.cache.options.factory";
import { ArtistConfigService } from "./artist.config.service";
import { ArtistConfigServiceInterface } from "./artist.config.service.interface";

describe("ArtistCacheOptionsFactory", () => {
  const artistConfigServiceMock: ArtistConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0
  };

  let service: ArtistConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: ArtistConfigService,
            useValue: artistConfigServiceMock
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<ArtistConfigService>(ArtistConfigService);
    });

    it("should be defined", () => {
      expect(new ArtistCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should equal to an option", () => {
      expect(
        new ArtistCacheOptionsFactory(service).createCacheOptions()
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
            provide: ArtistConfigService,
            useValue: { ...artistConfigServiceMock, cacheStore: "none" }
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<ArtistConfigService>(ArtistConfigService);
    });

    it("createCacheOptions should equal to an option with store none", () => {
      expect(
        new ArtistCacheOptionsFactory(service).createCacheOptions()
      ).toEqual({
        host: "",
        max: 0,
        port: 0,
        store: "none",
        ttl: 0
      });
    });
  });
});
