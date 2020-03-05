import { Test, TestingModule } from "@nestjs/testing";
import { SongCacheOptionsFactory } from "./song.cache.options.factory";
import { SongConfigService } from "./song.config.service";
import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";

describe("SongCacheOptionsFactory", () => {
  let service: SongConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const songConfigServiceMock = {
        cacheHost: "",
        cacheMax: 0,
        cachePort: 0,
        cacheStore: "",
        cacheTTL: 0
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: SongConfigService,
            useValue: songConfigServiceMock
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<SongConfigService>(SongConfigService);
    });

    it("should be defined", () => {
      expect(new SongCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be defined", () => {
      expect(
        new SongCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });

  describe("cacheStore none", () => {
    beforeEach(async () => {
      const songConfigServiceMock = {
        cacheHost: "",
        cacheMax: 0,
        cachePort: 0,
        cacheStore: "none",
        cacheTTL: 0
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: SongConfigService,
            useValue: songConfigServiceMock
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<SongConfigService>(SongConfigService);
    });

    it("createCacheOptions should be defined with store none", () => {
      expect(
        new SongCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });
});
