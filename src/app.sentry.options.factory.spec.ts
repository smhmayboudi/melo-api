import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppSentryOptionsFactory } from "./app.sentry.options.factory";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";

describe("AppSentryOptionsFactory", () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ConfigModule.forFeature(config)],
      providers: [AppConfigService]
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(new AppSentryOptionsFactory(service)).toBeDefined();
  });
});
