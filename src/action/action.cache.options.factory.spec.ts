import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { ActionCacheOptionsFactory } from "./action.cache.options.factory";
import { ActionConfigService } from "./action.config.service";
import { AppConfigService } from "../app.config.service";

describe("ActionCacheOptionsFactory", () => {
  let service: ActionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionConfigService, AppConfigService, ConfigService]
    }).compile();

    service = module.get<ActionConfigService>(ActionConfigService);
  });

  it("should be defined", () => {
    expect(new ActionCacheOptionsFactory(service)).toBeDefined();
  });
});
