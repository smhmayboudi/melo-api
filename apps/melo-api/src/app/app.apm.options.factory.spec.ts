import AppApmLogger from "./app.apm.logger";
import { AppApmOptionsFactory } from "./app.apm.options.factory";
import { AppConfigService } from "./app.config.service";
import { AppConfigServiceInterface } from "./app.config.service.interface";
import { LogLevel } from "@melo/apm";
import { Test } from "@nestjs/testing";

describe("AppApmOptionsFactory", () => {
  const appConfigServiceMock: AppConfigServiceInterface = {
    apmActive: false,
    apmLogLevel: "trace",
    apmSecretToken: "",
    apmServerUrl: "",
    apmServiceName: "",
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    dgraphAddress: "",
    dgraphDebug: true,
    hashIdAlphabet:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    hashIdMinLength: 0,
    hashIdSalt: "cfhistuCFHISTU",
    hashIdSeps: "",
    mangooseRetryAttempts: 0,
    mangooseRetryDelay: 0,
    mangooseUri: "",
    port: 0,
    promDefaultLabels: {
      "": "",
    },
    promDefaultMetricsEnabled: true,
    promPath: "",
    promPrefix: "",
    rateLimitMax: 0,
    rateLimitWindowMs: 0,
    sentryDebug: true,
    sentryDsn: "",
    sentryEnviroment: "",
    sentryLogLevel: 0,
    sentryRelease: "",
    typeormDatabase: "",
    typeormHost: "",
    typeormLogging: true,
    typeormPassword: "",
    typeormPort: 0,
    typeormSynchronize: true,
    typeormUsername: "",
  };

  let service: AppConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: AppConfigService,
          useValue: appConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(new AppApmOptionsFactory(service)).toBeDefined();
  });

  it("createApmOptions should equal", () => {
    expect(new AppApmOptionsFactory(service).createApmOptions()).toEqual({
      active: false,
      errorOnAbortedRequests: true,
      ignoreUrls: ["/health"],
      logLevel: "trace" as LogLevel,
      logUncaughtExceptions: true,
      logger: AppApmLogger,
      secretToken: "",
      serverUrl: "",
      serviceName: "",
    });
  });
});
