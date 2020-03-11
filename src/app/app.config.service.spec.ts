import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "./app.config.service";

describe("AppService", () => {
  describe("get: number", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): number => 0
    };

    let service: AppConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AppConfigService,
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<AppConfigService>(AppConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("cacheMax should be defined", () => {
      expect(service.cacheMax).toEqual(0);
    });

    it("cachePort should be defined", () => {
      expect(service.cachePort).toEqual(0);
    });

    it("hashIdMinLength should be defined", () => {
      expect(service.hashIdMinLength).toEqual(0);
    });

    it("mangooseRetryAttempts should be defined", () => {
      expect(service.mangooseRetryAttempts).toEqual(0);
    });

    it("port should be defined", () => {
      expect(service.port).toEqual(0);
    });

    it("rateLimitMax should be defined", () => {
      expect(service.rateLimitMax).toEqual(0);
    });
  });

  describe("get: string", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => ""
    };

    let service: AppConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AppConfigService,
          {
            provide: AppConfigService,
            useValue: {}
          },
          {
            provide: ConfigService,
            useValue: configServiceMock
          }
        ]
      }).compile();
      service = module.get<AppConfigService>(AppConfigService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("apmLogLevel cacheHostshould be defined", () => {
      expect(service.apmLogLevel).toEqual("");
    });

    it("apmSecretToken should be defined", () => {
      expect(service.apmSecretToken).toEqual("");
    });

    it("apmServerUrl should be defined", () => {
      expect(service.apmServerUrl).toEqual("");
    });

    it("apmServiceName should be defined", () => {
      expect(service.apmServiceName).toEqual("");
    });

    it("cacheHost should be defined", () => {
      expect(service.cacheHost).toEqual("");
    });

    it("cacheStore should be defined", () => {
      expect(service.cacheStore).toEqual("");
    });

    it.todo("cacheTTL should be defined");

    it("hashIdAlphabet should be defined", () => {
      expect(service.hashIdAlphabet).toEqual("");
    });

    it("hashIdSalt should be defined", () => {
      expect(service.hashIdSalt).toEqual("");
    });

    it("imgProxyBaseUrl should be defined", () => {
      expect(service.imgProxyBaseUrl).toEqual("");
    });

    it.todo("imgProxyEncode should be defined");
    it.todo("imgProxyTypeSize should be defined");

    it("imgProxyKey should be defined", () => {
      expect(service.imgProxyKey).toEqual("");
    });

    it("imgProxySalt should be defined", () => {
      expect(service.imgProxySalt).toEqual("");
    });

    it("imgProxySignatureSize should be defined", () => {
      expect(service.imgProxySignatureSize).toEqual("");
    });

    it("mangooseRetryDelay should be defined", () => {
      expect(service.mangooseRetryDelay).toEqual("");
    });

    it("mangooseUri should be defined", () => {
      expect(service.mangooseUri).toEqual("");
    });

    it("promDefaultLabels should be defined", () => {
      expect(service.promDefaultLabels).toEqual("");
    });

    it.todo("promDefaultMetricsEnabled should be defined");

    it("promPath should be defined", () => {
      expect(service.promPath).toEqual("");
    });

    it("promPrefix should be defined", () => {
      expect(service.promPrefix).toEqual("");
    });

    it.todo("rateLimitWindowMs should be defined");
    it.todo("sentryDebug should be defined");

    it("sentryDsn should be defined", () => {
      expect(service.sentryDsn).toEqual("");
    });

    it("sentryEnviroment should be defined", () => {
      expect(service.sentryEnviroment).toEqual("");
    });

    it.todo("sentryLogLevel should be defined");

    it("sentryRelease should be defined", () => {
      expect(service.sentryRelease).toEqual("");
    });

    it("typeOrmDatabase should be defined", () => {
      expect(service.typeOrmDatabase).toEqual("");
    });

    it("typeOrmHost should be defined", () => {
      expect(service.typeOrmHost).toEqual("");
    });

    it.todo("typeOrmLogging should be defined");

    it("typeOrmPassword should be defined", () => {
      expect(service.typeOrmPassword).toEqual("");
    });

    it("typeOrmPort should be defined", () => {
      expect(service.typeOrmPort).toEqual("");
    });

    it("typeOrmSynchronize should be defined", () => {
      expect(service.typeOrmSynchronize).toEqual("");
    });

    it("typeOrmUsername should be defined", () => {
      expect(service.typeOrmUsername).toEqual("");
    });
  });
});
