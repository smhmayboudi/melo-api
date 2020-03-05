import { Test, TestingModule } from "@nestjs/testing";
import { SearchCacheOptionsFactory } from "./search.cache.options.factory";
import { SearchConfigService } from "./search.config.service";
import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";

describe("SearchCacheOptionsFactory", () => {
  let service: SearchConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AppConfigService,
          useValue: {}
        },
        {
          provide: ConfigService,
          useValue: {}
        },
        SearchConfigService
      ]
    }).compile();
    service = module.get<SearchConfigService>(SearchConfigService);
  });

  it("should be defined", () => {
    jest.spyOn(service, "cacheHost", "get").mockReturnValue("");
    jest.spyOn(service, "cacheMax", "get").mockReturnValue(0);
    jest.spyOn(service, "cachePort", "get").mockReturnValue(0);
    jest.spyOn(service, "cacheStore", "get").mockReturnValue("");
    jest.spyOn(service, "cacheTTL", "get").mockReturnValue(0);
    expect(new SearchCacheOptionsFactory(service)).toBeDefined();
  });

  it("createCacheOptions should be defined", () => {
    jest.spyOn(service, "cacheHost", "get").mockReturnValue("");
    jest.spyOn(service, "cacheMax", "get").mockReturnValue(0);
    jest.spyOn(service, "cachePort", "get").mockReturnValue(0);
    jest.spyOn(service, "cacheStore", "get").mockReturnValue("");
    jest.spyOn(service, "cacheTTL", "get").mockReturnValue(0);
    expect(
      new SearchCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });

  it("createCacheOptions should be defined with store none", () => {
    jest.spyOn(service, "cacheHost", "get").mockReturnValue("");
    jest.spyOn(service, "cacheMax", "get").mockReturnValue(0);
    jest.spyOn(service, "cachePort", "get").mockReturnValue(0);
    jest.spyOn(service, "cacheStore", "get").mockReturnValue("none");
    jest.spyOn(service, "cacheTTL", "get").mockReturnValue(0);
    expect(
      new SearchCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });
});
