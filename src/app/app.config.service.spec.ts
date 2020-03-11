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

    it("cacheMax should be equal to a value", () => {
      expect(service.cacheMax).toEqual(0);
    });

    it("cachePort should be equal to a value", () => {
      expect(service.cachePort).toEqual(0);
    });

    it("hashIdMinLength should be equal to a value", () => {
      expect(service.hashIdMinLength).toEqual(0);
    });

    it("mangooseRetryAttempts should be equal to a value", () => {
      expect(service.mangooseRetryAttempts).toEqual(0);
    });

    it("port should be equal to a value", () => {
      expect(service.port).toEqual(0);
    });

    it("rateLimitMax should be equal to a value", () => {
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

    it("cacheStore should be equal to a value", () => {
      expect(service.cacheStore).toEqual("");
    });

    it.todo("cacheTTL should be equal to a value");

    it("hashIdAlphabet should be equal to a value", () => {
      expect(service.hashIdAlphabet).toEqual("");
    });

    it("hashIdSalt should be equal to a value", () => {
      expect(service.hashIdSalt).toEqual("");
    });

    it("imgProxyBaseUrl should be equal to a value", () => {
      expect(service.imgProxyBaseUrl).toEqual("");
    });

    it.todo("imgProxyEncode should be equal to a value");
    it.todo("imgProxyTypeSize should be equal to a value");

    it("imgProxyKey should be equal to a value", () => {
      expect(service.imgProxyKey).toEqual("");
    });

    it("imgProxySalt should be equal to a value", () => {
      expect(service.imgProxySalt).toEqual("");
    });

    it("imgProxySignatureSize should be equal to a value", () => {
      expect(service.imgProxySignatureSize).toEqual("");
    });

    it("mangooseUri should be equal to a value", () => {
      expect(service.mangooseUri).toEqual("");
    });

    it.todo("promDefaultMetricsEnabled should be equal to a value");

    it("promPath should be equal to a value", () => {
      expect(service.promPath).toEqual("");
    });

    it("promPrefix should be equal to a value", () => {
      expect(service.promPrefix).toEqual("");
    });

    it.todo("rateLimitWindowMs should be equal to a value");
    it.todo("sentryDebug should be equal to a value");

    it("sentryDsn should be equal to a value", () => {
      expect(service.sentryDsn).toEqual("");
    });

    it("sentryEnviroment should be equal to a value", () => {
      expect(service.sentryEnviroment).toEqual("");
    });

    it.todo("sentryLogLevel should be equal to a value");

    it("sentryRelease should be equal to a value", () => {
      expect(service.sentryRelease).toEqual("");
    });

    it("typeOrmDatabase should be equal to a value", () => {
      expect(service.typeOrmDatabase).toEqual("");
    });

    it("typeOrmHost should be equal to a value", () => {
      expect(service.typeOrmHost).toEqual("");
    });

    it.todo("typeOrmLogging should be equal to a value");

    it("typeOrmPassword should be equal to a value", () => {
      expect(service.typeOrmPassword).toEqual("");
    });

    it("typeOrmPort should be equal to a value", () => {
      expect(service.typeOrmPort).toEqual("");
    });

    it("typeOrmSynchronize should be equal to a value", () => {
      expect(service.typeOrmSynchronize).toEqual("");
    });

    it("typeOrmUsername should be equal to a value", () => {
      expect(service.typeOrmUsername).toEqual("");
    });

    it.todo("promDefaultLabels");
  });

  describe("get: 0 as string", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => "0"
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

    it("mangooseRetryDelay should be equal to a value", () => {
      expect(service.mangooseRetryDelay).toEqual(0);
    });
  });
});
