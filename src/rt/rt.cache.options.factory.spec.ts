import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { RtCacheOptionsFactory } from "./rt.cache.options.factory";
import { RtConfigService } from "./rt.config.service";
import { RtConfigServiceInterface } from "./rt.config.service.interface";

describe("RtCacheOptionsFactory", () => {
  const rtConfigServiceMock: RtConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0
  };

  let service: RtConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: RtConfigService,
            useValue: rtConfigServiceMock
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<RtConfigService>(RtConfigService);
    });

    it("should be defined", () => {
      expect(new RtCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be defined", () => {
      expect(
        new RtCacheOptionsFactory(service).createCacheOptions()
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
            provide: RtConfigService,
            useValue: { ...rtConfigServiceMock, cacheStore: "none" }
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<RtConfigService>(RtConfigService);
    });

    it("createCacheOptions should be defined with store none", () => {
      expect(
        new RtCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });
});
