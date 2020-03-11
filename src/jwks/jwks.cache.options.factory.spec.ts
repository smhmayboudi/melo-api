import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { JwksCacheOptionsFactory } from "./jwks.cache.options.factory";
import { JwksConfigService } from "./jwks.config.service";
import { JwksConfigServiceInterface } from "./jwks.config.service.interface";

describe("JwksCacheOptionsFactory", () => {
  const jwksConfigServiceMock: JwksConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0
  };

  let service: JwksConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: JwksConfigService,
            useValue: jwksConfigServiceMock
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<JwksConfigService>(JwksConfigService);
    });

    it("should be defined", () => {
      expect(new JwksCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should equal to an option", () => {
      expect(
        new JwksCacheOptionsFactory(service).createCacheOptions()
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
            provide: JwksConfigService,
            useValue: { ...jwksConfigServiceMock, cacheStore: "none" }
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<JwksConfigService>(JwksConfigService);
    });

    it("createCacheOptions should equal to an option with store none", () => {
      expect(new JwksCacheOptionsFactory(service).createCacheOptions()).toEqual(
        {
          host: "",
          max: 0,
          port: 0,
          store: "none",
          ttl: 0
        }
      );
    });
  });
});
