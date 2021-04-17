import { APP_CACHE_STORE_NONE } from "@melo/common";
import { PlaylistCacheOptionsFactory } from "./playlist.cache.options.factory";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";
import { Test } from "@nestjs/testing";

describe("PlaylistCacheOptionsFactory", () => {
  const playlistConfigServiceMock: PlaylistConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: PlaylistConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: PlaylistConfigService,
          useValue: playlistConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<PlaylistConfigService>(PlaylistConfigService);
  });

  it("should be defined", () => {
    expect(new PlaylistCacheOptionsFactory(service)).toBeDefined();
  });

  it("createCacheOptions should be equal to an option", () => {
    expect(
      new PlaylistCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: PlaylistConfigService,
          useValue: {
            ...playlistConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<PlaylistConfigService>(PlaylistConfigService);

    expect(
      new PlaylistCacheOptionsFactory(service).createCacheOptions()
    ).toEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
