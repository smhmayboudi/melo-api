import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
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
    sendTelegramUrl: "",
    timeout: 0,
  };

  let service: SongConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: SongConfigService,
            useValue: songConfigServiceMock,
          },
          {
            provide: ConfigService,
            useValue: {},
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

  describe("cacheStore none", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: SongConfigService,
            useValue: { ...songConfigServiceMock, cacheStore: "none" },
          },
          {
            provide: ConfigService,
            useValue: {},
          },
        ],
      }).compile();
      service = module.get<SongConfigService>(SongConfigService);
    });

    it("createCacheOptions should be equal to an option with store none", () => {
      expect(new SongCacheOptionsFactory(service).createCacheOptions()).toEqual(
        {
          host: "",
          max: 0,
          port: 0,
          store: "none",
          ttl: 0,
        }
      );
    });
  });
});
