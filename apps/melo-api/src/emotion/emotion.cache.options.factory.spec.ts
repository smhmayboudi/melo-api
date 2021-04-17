import { APP_CACHE_STORE_NONE } from "@melo/common";
import { EmotionCacheOptionsFactory } from "./emotion.cache.options.factory";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";
import { Test } from "@nestjs/testing";

describe("EmotionCacheOptionsFactory", () => {
  const emotionConfigServiceMock: EmotionConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: EmotionConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: EmotionConfigService,
          useValue: emotionConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<EmotionConfigService>(EmotionConfigService);
  });

  it("should be defined", () => {
    expect(new EmotionCacheOptionsFactory(service)).toBeDefined();
  });

  it("createCacheOptions should be equal to an option", () => {
    expect(
      new EmotionCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: EmotionConfigService,
          useValue: {
            ...emotionConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<EmotionConfigService>(EmotionConfigService);

    expect(
      new EmotionCacheOptionsFactory(service).createCacheOptions()
    ).toEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
