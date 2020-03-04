import { Test, TestingModule } from "@nestjs/testing";
import { ActionCacheOptionsFactory } from "./action.cache.options.factory";
import { ActionConfigService } from "./action.config.service";
import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";

describe("ActionCacheOptionsFactory", () => {
  let service: ActionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AppConfigService,
          useValue: jest.fn()
        },
        ActionConfigService,
        {
          provide: ConfigService,
          useValue: jest.fn()
        }
      ]
    }).compile();
    service = module.get<ActionConfigService>(ActionConfigService);
  });

  it("should be defined", () => {
    jest.spyOn(service, "cacheHost", "get").mockReturnValue("");
    jest.spyOn(service, "cacheMax", "get").mockReturnValue(0);
    jest.spyOn(service, "cachePort", "get").mockReturnValue(0);
    jest.spyOn(service, "cacheStore", "get").mockReturnValue("");
    jest.spyOn(service, "cacheTTL", "get").mockReturnValue(0);
    expect(new ActionCacheOptionsFactory(service)).toBeDefined();
  });

  it("createCacheOptions should be defined", () => {
    jest.spyOn(service, "cacheHost", "get").mockReturnValue("");
    jest.spyOn(service, "cacheMax", "get").mockReturnValue(0);
    jest.spyOn(service, "cachePort", "get").mockReturnValue(0);
    jest.spyOn(service, "cacheStore", "get").mockReturnValue("");
    jest.spyOn(service, "cacheTTL", "get").mockReturnValue(0);
    expect(
      new ActionCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });

  it("createCacheOptions should be defined with store none", () => {
    jest.spyOn(service, "cacheHost", "get").mockReturnValue("");
    jest.spyOn(service, "cacheMax", "get").mockReturnValue(0);
    jest.spyOn(service, "cachePort", "get").mockReturnValue(0);
    jest.spyOn(service, "cacheStore", "get").mockReturnValue("none");
    jest.spyOn(service, "cacheTTL", "get").mockReturnValue(0);
    expect(
      new ActionCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });
});
