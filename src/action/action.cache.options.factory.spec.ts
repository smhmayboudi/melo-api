import { Test, TestingModule } from "@nestjs/testing";

import { ActionCacheOptionsFactory } from "./action.cache.options.factory";
import { ActionConfigService } from "./action.config.service";
import { ActionConfigServiceInterface } from "./action.config.service.interface";
import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";

describe("ActionCacheOptionsFactory", () => {
  const actionConfigServiceMock: ActionConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: ActionConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: ActionConfigService,
            useValue: actionConfigServiceMock,
          },
          {
            provide: ConfigService,
            useValue: {},
          },
        ],
      }).compile();
      service = module.get<ActionConfigService>(ActionConfigService);
    });

    it("should be defined", () => {
      expect(new ActionCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be equal to an option", () => {
      expect(
        new ActionCacheOptionsFactory(service).createCacheOptions()
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
            provide: ActionConfigService,
            useValue: { ...actionConfigServiceMock, cacheStore: "none" },
          },
          {
            provide: ConfigService,
            useValue: {},
          },
        ],
      }).compile();
      service = module.get<ActionConfigService>(ActionConfigService);
    });

    it("createCacheOptions should be equal to an option with store none", () => {
      expect(
        new ActionCacheOptionsFactory(service).createCacheOptions()
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
