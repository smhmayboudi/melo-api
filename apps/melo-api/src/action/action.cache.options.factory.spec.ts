import { APP_CACHE_STORE_NONE } from "@melo/common";
import { ActionCacheOptionsFactory } from "./action.cache.options.factory";
import { ActionConfigService } from "./action.config.service";
import { ActionConfigServiceInterface } from "./action.config.service.interface";
import { Test } from "@nestjs/testing";

describe("ActionCacheOptionsFactory", () => {
  const actionConfigServiceMock: ActionConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: ActionConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ActionConfigService,
          useValue: actionConfigServiceMock,
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

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ActionConfigService,
          useValue: {
            ...actionConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<ActionConfigService>(ActionConfigService);

    expect(new ActionCacheOptionsFactory(service).createCacheOptions()).toEqual(
      {
        host: "",
        max: 0,
        port: 0,
        store: APP_CACHE_STORE_NONE,
        ttl: 0,
      }
    );
  });
});
