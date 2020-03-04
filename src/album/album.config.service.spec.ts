import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { AlbumConfigService } from "./album.config.service";

describe("AlbumService", () => {
  let service: AlbumConfigService;

  const appConfigServiceMock = {
    get: (): any => 0
    // cacheHost: "",
    // cacheMax: 0,
    // cachePort: 0,
    // cacheStore: "",
    // cacheTTL: 0
  };
  const configServiceMock = {
    get: (): any => 0
    // cacheHost: "",
    // cacheMax: 0,
    // cachePort: 0,
    // cacheStore: "",
    // cacheTTL: 0
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumConfigService,
        {
          provide: AppConfigService,
          useValue: appConfigServiceMock
        },
        {
          provide: ConfigService,
          useValue: configServiceMock
        }
      ]
    }).compile();
    service = module.get<AlbumConfigService>(AlbumConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("cacheHost cacheHostshould be defined", () => {
    expect(service.cacheHost).toBe("");
  });

  it("cacheMax should be defined", () => {
    expect(service.cacheMax).toBe(0);
  });

  it("cachePort should be defined", () => {
    expect(service.cachePort).toBe(0);
  });

  it("cacheStore should be defined", () => {
    expect(service.cacheStore).toBe("");
  });

  it("cacheTTL should be defined", () => {
    expect(service.cacheTTL).toBe(0);
  });
});
