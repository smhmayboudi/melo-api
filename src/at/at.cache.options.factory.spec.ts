import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app.config.service";
import { AtCacheOptionsFactory } from "./at.cache.options.factory";
import { AtConfigService } from "./at.config.service";

describe("AtCacheOptionsFactory", () => {
  let service: AtConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtConfigService, AppConfigService, ConfigService]
    }).compile();

    service = module.get<AtConfigService>(AtConfigService);
  });

  it("should be defined", () => {
    expect(new AtCacheOptionsFactory(service)).toBeDefined();
  });
});
