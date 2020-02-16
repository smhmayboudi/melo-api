import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";

describe("AppCacheOptionsFactory", () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ConfigModule.forFeature(config)],
      providers: [AppConfigService]
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(new AppCacheOptionsFactory(service)).toBeDefined();
  });
});
