import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { UserCacheOptionsFactory } from "./user.cache.options.factory";
import { UserConfigService } from "./user.config.service";
import { UserConfigServiceInterface } from "./user.config.service.interface";

describe("UserCacheOptionsFactory", () => {
  const userConfigServiceMock: UserConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0
  };

  let service: UserConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: UserConfigService,
            useValue: userConfigServiceMock
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<UserConfigService>(UserConfigService);
    });

    it("should be defined", () => {
      expect(new UserCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should equal to an option", () => {
      expect(
        new UserCacheOptionsFactory(service).createCacheOptions()
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
            provide: UserConfigService,
            useValue: { ...userConfigServiceMock, cacheStore: "none" }
          },
          {
            provide: ConfigService,
            useValue: {}
          }
        ]
      }).compile();
      service = module.get<UserConfigService>(UserConfigService);
    });

    it("createCacheOptions should equal to an option with store none", () => {
      expect(new UserCacheOptionsFactory(service).createCacheOptions()).toEqual(
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
