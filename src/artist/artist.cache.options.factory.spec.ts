import { Test, TestingModule } from "@nestjs/testing";
import { ArtistCacheOptionsFactory } from "./artist.cache.options.factory";
import { ArtistConfigService } from "./artist.config.service";
import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";

describe("ArtistCacheOptionsFactory", () => {
  let service: ArtistConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AppConfigService,
          useValue: jest.fn()
        },
        ArtistConfigService,
        {
          provide: ConfigService,
          useValue: jest.fn()
        }
      ]
    }).compile();
    service = module.get<ArtistConfigService>(ArtistConfigService);
  });

  it("should be defined", () => {
    jest.spyOn(service, "cacheHost", "get").mockReturnValue("");
    jest.spyOn(service, "cacheMax", "get").mockReturnValue(0);
    jest.spyOn(service, "cachePort", "get").mockReturnValue(0);
    jest.spyOn(service, "cacheStore", "get").mockReturnValue("");
    jest.spyOn(service, "cacheTTL", "get").mockReturnValue(0);
    expect(new ArtistCacheOptionsFactory(service)).toBeDefined();
  });

  it("createCacheOptions should be defined", () => {
    jest.spyOn(service, "cacheHost", "get").mockReturnValue("");
    jest.spyOn(service, "cacheMax", "get").mockReturnValue(0);
    jest.spyOn(service, "cachePort", "get").mockReturnValue(0);
    jest.spyOn(service, "cacheStore", "get").mockReturnValue("");
    jest.spyOn(service, "cacheTTL", "get").mockReturnValue(0);
    expect(
      new ArtistCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });

  it("createCacheOptions should be defined with store none", () => {
    jest.spyOn(service, "cacheHost", "get").mockReturnValue("");
    jest.spyOn(service, "cacheMax", "get").mockReturnValue(0);
    jest.spyOn(service, "cachePort", "get").mockReturnValue(0);
    jest.spyOn(service, "cacheStore", "get").mockReturnValue("none");
    jest.spyOn(service, "cacheTTL", "get").mockReturnValue(0);
    expect(
      new ArtistCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });
});
