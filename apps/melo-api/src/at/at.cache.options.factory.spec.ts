import { APP_CACHE_STORE_NONE } from "@melo/common";
import { AtCacheOptionsFactory } from "./at.cache.options.factory";
import { AtConfigService } from "./at.config.service";
import { AtConfigServiceInterface } from "./at.config.service.interface";
import { Test } from "@nestjs/testing";

describe("AtCacheOptionsFactory", () => {
  const atConfigServiceMock: AtConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: AtConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: AtConfigService,
          useValue: atConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<AtConfigService>(AtConfigService);
  });

  it("should be defined", () => {
    expect(new AtCacheOptionsFactory(service)).toBeDefined();
  });

  it("createCacheOptions should be equal to an option", () => {
    expect(
      new AtCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: AtConfigService,
          useValue: {
            ...atConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<AtConfigService>(AtConfigService);

    expect(new AtCacheOptionsFactory(service).createCacheOptions()).toEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
