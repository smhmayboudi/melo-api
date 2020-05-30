import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { SongConfigService } from "./song.config.service";
import { SongConfigServiceInterface } from "./song.config.service.interface";

describe("SongConfigService", () => {
  // TODO: interface ?
  const appConfigServiceMock: SongConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    maxSize: 0,
    sendTimeout: 0,
    sendUrl: "",
  };
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: SongConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongConfigService,
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
    service = module.get<SongConfigService>(SongConfigService);
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

  it("maxSize should be equal to a value", () => {
    expect(service.maxSize).toEqual(0);
  });

  it("timeout should be equal to a value", () => {
    expect(service.sendTimeout).toEqual(0);
  });

  it("url should be equal to a value", () => {
    expect(service.sendUrl).toEqual("");
  });
});
