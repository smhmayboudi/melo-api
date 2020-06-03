import { APP_CACHE_STORE_NONE } from "@melo/common";
import { ConstCacheOptionsFactory } from "./const.cache.options.factory";
import { ConstConfigService } from "./const.config.service";
import { ConstConfigServiceInterface } from "./const.config.service.interface";
import { Test } from "@nestjs/testing";

describe("ConstCacheOptionsFactory", () => {
  const constConfigServiceMock: ConstConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    staticImagePaths: {},
  };

  let service: ConstConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ConstConfigService,
          useValue: constConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<ConstConfigService>(ConstConfigService);
  });

  it("should be defined", () => {
    expect(new ConstCacheOptionsFactory(service)).toBeDefined();
  });

  it("createCacheOptions should be equal to an option", () => {
    expect(
      new ConstCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ConstConfigService,
          useValue: {
            ...constConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<ConstConfigService>(ConstConfigService);

    expect(new ConstCacheOptionsFactory(service).createCacheOptions()).toEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
