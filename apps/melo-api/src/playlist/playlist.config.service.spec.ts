import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";
import { Test } from "@nestjs/testing";

describe("PlaylistConfigService", () => {
  // TODO: interface ?
  const appConfigServiceMock: PlaylistConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: PlaylistConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PlaylistConfigService,
        {
          provide: AppConfigService,
          useValue: appConfigServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<PlaylistConfigService>(PlaylistConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("cacheHost cacheHost should be equal to a value", () => {
    expect(service.cacheHost).toEqual("");
  });

  it("cacheMax should be equal to a value", () => {
    expect(service.cacheMax).toEqual(0);
  });

  it("cachePort should be equal to a value", () => {
    expect(service.cachePort).toEqual(0);
  });

  it("cacheStore should be equal to a value", () => {
    expect(service.cacheStore).toEqual("");
  });

  it("cacheTTL should be equal to a value", () => {
    expect(service.cacheTTL).toEqual(0);
  });
});
