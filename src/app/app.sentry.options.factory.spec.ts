import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "./app.config.service";
import { AppSentryOptionsFactory } from "./app.sentry.options.factory";

describe("AppSentryOptionsFactory", () => {
  // TODO interface ?
  const appConfigServiceMock = {
    sentryDebug: "",
    sentryDsn: "",
    sentryEnviroment: "",
    sentryLogLevel: "",
    sentryRelease: ""
  };
  const options = {
    debug: appConfigServiceMock.sentryDebug,
    dsn: appConfigServiceMock.sentryDsn,
    environment: appConfigServiceMock.sentryEnviroment,
    logLevel: appConfigServiceMock.sentryLogLevel,
    release: appConfigServiceMock.sentryRelease
  };

  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AppConfigService, useValue: appConfigServiceMock }]
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(new AppSentryOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect(new AppSentryOptionsFactory(service).createSentryOptions()).toEqual(
      options
    );
  });
});
