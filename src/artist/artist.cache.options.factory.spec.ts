import { Test, TestingModule } from "@nestjs/testing";
import { ArtistCacheOptionsFactory } from "./artist.cache.options.factory";
import { ArtistConfigService } from "./artist.config.service";
import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";

describe("ArtistCacheOptionsFactory", () => {
  const artistConfigServiceMock = {
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

    it("createCacheOptions should be defined", () => {
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

    it("createCacheOptions should be defined with store none", () => {
      expect(
        new ArtistCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });
});
