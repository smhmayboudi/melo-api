import { APP_CACHE_STORE_NONE } from "@melo/common";
import { FileCacheOptionsFactory } from "./file.cache.options.factory";
import { FileConfigService } from "./file.config.service";
import { FileConfigServiceInterface } from "./file.config.service.interface";
import { Test } from "@nestjs/testing";

describe("FileCacheOptionsFactory", () => {
  const fileConfigServiceMock: FileConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: FileConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: FileConfigService,
          useValue: fileConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<FileConfigService>(FileConfigService);
  });

  it("should be defined", () => {
    expect(new FileCacheOptionsFactory(service)).toBeDefined();
  });

  it("createCacheOptions should be equal to an option", () => {
    expect(
      new FileCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: FileConfigService,
          useValue: {
            ...fileConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<FileConfigService>(FileConfigService);

    expect(new FileCacheOptionsFactory(service).createCacheOptions()).toEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
