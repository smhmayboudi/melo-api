import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "./app.config.service";
import { AppSentryOptionsFactory } from "./app.sentry.options.factory";

describe("AppSentryOptionsFactory", () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService]
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(new AppSentryOptionsFactory(service)).toBeDefined();
  });
});
