import { Test, TestingModule } from "@nestjs/testing";

import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import { AppConfigService } from "../app/app.config.service";
import { AppConfigServiceInterface } from "./app.config.service.interface";
import { ConfigService } from "@nestjs/config";

describe("AppCacheOptionsFactory", () => {
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
    hashIdAlphabet:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    hashIdMinLength: 0,
    hashIdSalt: "cfhistuCFHISTU",
    hashIdSeps: "",
    imgProxyBaseUrl: "",
    imgProxyEncode: true,
    imgProxyKey: "",
    imgProxySalt: "",
    imgProxySignatureSize: 32,
    imgProxyTypeSize: [{ height: 1024, name: "cover", width: 1024 }],
    mangooseRetryAttempts: 0,
    mangooseRetryDelay: 0,
    mangooseUri: "",
    port: 0,
    promDefaultLabels: { "": "" },
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
    typeOrmDatabase: "",
    typeOrmHost: "",
    typeOrmLogging: true,
    typeOrmPassword: "",
    typeOrmPort: 0,
    typeOrmSynchronize: true,
    typeOrmUsername: "",
  };

  let service: AppConfigService;

  describe("cacheStore", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: AppConfigService,
            useValue: appConfigServiceMock,
          },
          {
            provide: ConfigService,
            useValue: {},
          },
        ],
      }).compile();
      service = module.get<AppConfigService>(AppConfigService);
    });

    it("should be defined", () => {
      expect(new AppCacheOptionsFactory(service)).toBeDefined();
    });

    it("createCacheOptions should be equal to an option", () => {
      expect(
        new AppCacheOptionsFactory(service).createCacheOptions()
      ).toBeDefined();
    });
  });

  describe("cacheStore none", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AppConfigService,
            useValue: {},
          },
          {
            provide: AppConfigService,
            useValue: { ...appConfigServiceMock, cacheStore: "none" },
          },
          {
            provide: ConfigService,
            useValue: {},
          },
        ],
      }).compile();
      service = module.get<AppConfigService>(AppConfigService);
    });

    it("createCacheOptions should be equal to an option with store none", () => {
      expect(new AppCacheOptionsFactory(service).createCacheOptions()).toEqual({
        host: "",
        max: 0,
        port: 0,
        store: "none",
        ttl: 0,
      });
    });
  });
});
