import { APP_CACHE_STORE_NONE } from "@melo/common";
import { DownloadCacheOptionsFactory } from "./download.cache.options.factory";
import { DownloadConfigService } from "./download.config.service";
import { DownloadConfigServiceInterface } from "./download.config.service.interface";
import { Test } from "@nestjs/testing";

describe("DownloadCacheOptionsFactory", () => {
  const downloadConfigServiceMock: DownloadConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: DownloadConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: DownloadConfigService,
          useValue: downloadConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<DownloadConfigService>(DownloadConfigService);
  });

  it("should be defined", () => {
    expect(new DownloadCacheOptionsFactory(service)).toBeDefined();
  });

  it("createCacheOptions should be equal to an option", () => {
    expect(
      new DownloadCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: DownloadConfigService,
          useValue: {
            ...downloadConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<DownloadConfigService>(DownloadConfigService);

    expect(
      new DownloadCacheOptionsFactory(service).createCacheOptions()
    ).toEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
