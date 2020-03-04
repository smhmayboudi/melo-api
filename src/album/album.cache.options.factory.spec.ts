import { Test, TestingModule } from "@nestjs/testing";
import { AlbumCacheOptionsFactory } from "./album.cache.options.factory";
import { AlbumConfigService } from "./album.config.service";
import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";

describe("AlbumCacheOptionsFactory", () => {
  let service: AlbumConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumConfigService,
        {
          provide: AppConfigService,
          useValue: jest.fn()
        },
        {
          provide: ConfigService,
          useValue: jest.fn()
        }
      ]
    }).compile();
    service = module.get<AlbumConfigService>(AlbumConfigService);
  });

  it("should be defined", () => {
    jest.spyOn(service, "cacheHost", "get").mockReturnValue("");
    jest.spyOn(service, "cacheMax", "get").mockReturnValue(0);
    jest.spyOn(service, "cachePort", "get").mockReturnValue(0);
    jest.spyOn(service, "cacheStore", "get").mockReturnValue("");
    jest.spyOn(service, "cacheTTL", "get").mockReturnValue(0);
    expect(new AlbumCacheOptionsFactory(service)).toBeDefined();
  });

  it("createCacheOptions should be defined", () => {
    jest.spyOn(service, "cacheHost", "get").mockReturnValue("");
    jest.spyOn(service, "cacheMax", "get").mockReturnValue(0);
    jest.spyOn(service, "cachePort", "get").mockReturnValue(0);
    jest.spyOn(service, "cacheStore", "get").mockReturnValue("");
    jest.spyOn(service, "cacheTTL", "get").mockReturnValue(0);
    expect(
      new AlbumCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });

  it("createCacheOptions should be defined with store none", () => {
    jest.spyOn(service, "cacheHost", "get").mockReturnValue("");
    jest.spyOn(service, "cacheMax", "get").mockReturnValue(0);
    jest.spyOn(service, "cachePort", "get").mockReturnValue(0);
    jest.spyOn(service, "cacheStore", "get").mockReturnValue("none");
    jest.spyOn(service, "cacheTTL", "get").mockReturnValue(0);
    expect(
      new AlbumCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });
});
