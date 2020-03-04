import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { AtCacheOptionsFactory } from "./at.cache.options.factory";
import config from "./at.config";
import { AtConfigService } from "./at.config.service";

describe("AtCacheOptionsFactory", () => {
  let service: AtConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [AtConfigService]
    }).compile();
    service = module.get<AtConfigService>(AtConfigService);
  });

  it("should be defined", () => {
    expect(new AtCacheOptionsFactory(service)).toBeDefined();
  });
});
