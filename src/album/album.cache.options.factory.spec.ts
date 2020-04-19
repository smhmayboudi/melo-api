import { Test, TestingModule } from "@nestjs/testing";

import { AlbumCacheOptionsFactory } from "./album.cache.options.factory";
import { AlbumConfigService } from "./album.config.service";
import { AlbumConfigServiceInterface } from "./album.config.service.interface";
import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";

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
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: AlbumConfigService,
            useValue: albumConfigServiceMock,
          },
          {
            provide: ConfigService,
            useValue: {},
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

  describe("cacheStore none", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: AlbumConfigService,
            useValue: { ...albumConfigServiceMock, cacheStore: "none" },
          },
          {
            provide: ConfigService,
            useValue: {},
          },
        ],
      }).compile();
      service = module.get<AlbumConfigService>(AlbumConfigService);
    });

    it("createCacheOptions should be equal to an option with store none", () => {
      expect(
        new AlbumCacheOptionsFactory(service).createCacheOptions()
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
