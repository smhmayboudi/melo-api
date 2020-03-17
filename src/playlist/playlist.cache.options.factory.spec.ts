import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { PlaylistCacheOptionsFactory } from "./playlist.cache.options.factory";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";

describe("PlaylistCacheOptionsFactory", () => {
  const playlistConfigServiceMock: PlaylistConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    defaultImagePath: "",
    imagePath: () => ""
  };

  let service: PlaylistConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: PlaylistConfigService,
            useValue: playlistConfigServiceMock
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<PlaylistConfigService>(PlaylistConfigService);
    });

    it("should be defined", () => {
      expect(new PlaylistCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be equal to an option", () => {
      expect(
        new PlaylistCacheOptionsFactory(service).createCacheOptions()
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
            provide: PlaylistConfigService,
            useValue: { ...playlistConfigServiceMock, cacheStore: "none" }
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<PlaylistConfigService>(PlaylistConfigService);
    });

    it("createCacheOptions should be equal to an option with store none", () => {
      expect(
        new PlaylistCacheOptionsFactory(service).createCacheOptions()
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
