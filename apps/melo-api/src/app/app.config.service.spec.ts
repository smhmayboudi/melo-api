import { APP_CACHE_STORE_NONE } from "@melo/common";
import { AppConfigService } from "./app.config.service";
import { ConfigService } from "@nestjs/config";
import { LogLevel } from "@sentry/types";
import { Test } from "@nestjs/testing";

describe("AppConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: AppConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("apmActive should be equal to a value", () => {
    expect(service.apmActive).toEqual(true);
  });

  it("apmLogLevel should be equal to a value", () => {
    expect(service.apmLogLevel).toEqual("");
  });

  it("apmSecretToken should be equal to a value", () => {
    expect(service.apmSecretToken).toEqual("");
  });

  it("apmServerUrl should be equal to a value", () => {
    expect(service.apmServerUrl).toEqual("");
  });

  it("apmServiceName should be equal to a value", () => {
    expect(service.apmServiceName).toEqual("");
  });

  it("cacheHost should be equal to a value", () => {
    expect(service.cacheHost).toEqual("");
  });

  it("cacheMax should be equal to a value", () => {
    expect(service.cacheMax).toEqual(0);
  });

  it("cachePort should be equal to a value", () => {
    expect(service.cachePort).toEqual(0);
  });

  it("cacheStore should be equal to a value", () => {
    expect(service.cacheStore).toEqual(APP_CACHE_STORE_NONE);
  });

  it("cacheTTL should be equal to a value", () => {
    expect(service.cacheTTL).toEqual(0);
  });

  it("dgraphAddress should be equal to a value", () => {
    expect(service.dgraphAddress).toEqual("");
  });

  it("dgraphDebug should be equal to a value", () => {
    expect(service.dgraphDebug).toEqual(true);
  });

  it("hashIdAlphabet should be equal to a value", () => {
    expect(service.hashIdAlphabet).toEqual("");
  });

  it("hashIdMinLength should be equal to a value", () => {
    expect(service.hashIdMinLength).toEqual(0);
  });

  it("hashIdSalt should be equal to a value", () => {
    expect(service.hashIdSalt).toEqual("");
  });

  it("hashIdSeps should be equal to a value", () => {
    expect(service.hashIdSeps).toEqual("");
  });

  it("mangooseRetryAttempts should be equal to a value", () => {
    expect(service.mangooseRetryAttempts).toEqual(0);
  });

  it("mangooseRetryDelay should be equal to a value", () => {
    expect(service.mangooseRetryDelay).toEqual(0);
  });

  it("mangooseUri should be equal to a value", () => {
    expect(service.mangooseUri).toEqual("");
  });

  it("port should be equal to a value", () => {
    expect(service.port).toEqual(0);
  });

  it("promDefaultLabels should be equal to a value", () => {
    expect(service.promDefaultLabels).toEqual({
      "": "",
    });
  });

  it("promDefaultMetricsEnabled should be equal to a value", () => {
    expect(service.promDefaultMetricsEnabled).toEqual(true);
  });

  it("promPath should be equal to a value", () => {
    expect(service.promPath).toEqual("");
  });

  it("promPrefix should be equal to a value", () => {
    expect(service.promPrefix).toEqual("");
  });

  it("rateLimitMax should be equal to a value", () => {
    expect(service.rateLimitMax).toEqual(0);
  });

  it("rateLimitWindowMs should be equal to a value", () => {
    expect(service.rateLimitWindowMs).toEqual(0);
  });

  it("sentryDebug should be equal to a value", () => {
    expect(service.sentryDebug).toEqual(true);
  });

  it("sentryDsn should be equal to a value", () => {
    expect(service.sentryDsn).toEqual("");
  });

  it("sentryEnviroment should be equal to a value", () => {
    expect(service.sentryEnviroment).toEqual("");
  });

  it("sentryLogLevel should be equal to a value", () => {
    expect(service.sentryLogLevel).toEqual(LogLevel.Error);
  });

  it("sentryLogLevel should be equal to a value 2", async () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (_propertyPath: string, _defaultValue: any): any => 2,
    };

    const module = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
    expect(service.sentryLogLevel).toEqual(LogLevel.Debug);
  });

  it("sentryLogLevel should be equal to a value 3", async () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (_propertyPath: string, _defaultValue: any): any => 3,
    };

    const module = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
    expect(service.sentryLogLevel).toEqual(LogLevel.Verbose);
  });

  it("sentryLogLevel should be equal to a value 4", async () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (_propertyPath: string, _defaultValue: any): any => 4,
    };

    const module = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
    expect(service.sentryLogLevel).toEqual(LogLevel.None);
  });

  it("sentryRelease should be equal to a value", () => {
    expect(service.sentryRelease).toEqual("");
  });

  it("typeormDatabase should be equal to a value", () => {
    expect(service.typeormDatabase).toEqual("");
  });

  it("typeormHost should be equal to a value", () => {
    expect(service.typeormHost).toEqual("");
  });

  it("typeormLogging should be equal to a value", () => {
    expect(service.typeormLogging).toEqual(true);
  });

  it("typeormPassword should be equal to a value", () => {
    expect(service.typeormPassword).toEqual("");
  });

  it("typeormPort should be equal to a value", () => {
    expect(service.typeormPort).toEqual(0);
  });

  it("typeormSynchronize should be equal to a value", () => {
    expect(service.typeormSynchronize).toEqual(true);
  });

  it("typeormUsername should be equal to a value", () => {
    expect(service.typeormUsername).toEqual("");
  });
});
