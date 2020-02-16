import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { ActionCacheOptionsFactory } from "./action.cache.options.factory";
import config from "./action.config";
import { ActionConfigService } from "./action.config.service";

describe("ActionCacheOptionsFactory", () => {
  let service: ActionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [ActionConfigService]
    }).compile();

    service = module.get<ActionConfigService>(ActionConfigService);
  });

  it("should be defined", () => {
    expect(new ActionCacheOptionsFactory(service)).toBeDefined();
  });
});
