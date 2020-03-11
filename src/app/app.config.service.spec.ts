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

    it("cacheMax should equal to a value", () => {
      expect(service.cacheMax).toEqual(0);
    });

    it("cachePort should equal to a value", () => {
      expect(service.cachePort).toEqual(0);
    });

    it("hashIdMinLength should equal to a value", () => {
      expect(service.hashIdMinLength).toEqual(0);
    });

    it("mangooseRetryAttempts should equal to a value", () => {
      expect(service.mangooseRetryAttempts).toEqual(0);
    });

    it("port should equal to a value", () => {
      expect(service.port).toEqual(0);
    });

    it("rateLimitMax should equal to a value", () => {
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

    it("apmLogLevel should equal to a value", () => {
      expect(service.apmLogLevel).toEqual("");
    });

    it("apmSecretToken should equal to a value", () => {
      expect(service.apmSecretToken).toEqual("");
    });

    it("apmServerUrl should equal to a value", () => {
      expect(service.apmServerUrl).toEqual("");
    });

    it("apmServiceName should equal to a value", () => {
      expect(service.apmServiceName).toEqual("");
    });

    it("cacheHost should equal to a value", () => {
      expect(service.cacheHost).toEqual("");
    });

    it("cacheStore should equal to a value", () => {
      expect(service.cacheStore).toEqual("");
    });

    it.todo("cacheTTL should equal to a value");

    it("hashIdAlphabet should equal to a value", () => {
      expect(service.hashIdAlphabet).toEqual("");
    });

    it("hashIdSalt should equal to a value", () => {
      expect(service.hashIdSalt).toEqual("");
    });

    it("imgProxyBaseUrl should equal to a value", () => {
      expect(service.imgProxyBaseUrl).toEqual("");
    });

    it.todo("imgProxyEncode should equal to a value");
    it.todo("imgProxyTypeSize should equal to a value");

    it("imgProxyKey should equal to a value", () => {
      expect(service.imgProxyKey).toEqual("");
    });

    it("imgProxySalt should equal to a value", () => {
      expect(service.imgProxySalt).toEqual("");
    });

    it("imgProxySignatureSize should equal to a value", () => {
      expect(service.imgProxySignatureSize).toEqual("");
    });

    it("mangooseUri should equal to a value", () => {
      expect(service.mangooseUri).toEqual("");
    });

    it.todo("promDefaultMetricsEnabled should equal to a value");

    it("promPath should equal to a value", () => {
      expect(service.promPath).toEqual("");
    });

    it("promPrefix should equal to a value", () => {
      expect(service.promPrefix).toEqual("");
    });

    it.todo("rateLimitWindowMs should equal to a value");
    it.todo("sentryDebug should equal to a value");

    it("sentryDsn should equal to a value", () => {
      expect(service.sentryDsn).toEqual("");
    });

    it("sentryEnviroment should equal to a value", () => {
      expect(service.sentryEnviroment).toEqual("");
    });

    it.todo("sentryLogLevel should equal to a value");

    it("sentryRelease should equal to a value", () => {
      expect(service.sentryRelease).toEqual("");
    });

    it("typeOrmDatabase should equal to a value", () => {
      expect(service.typeOrmDatabase).toEqual("");
    });

    it("typeOrmHost should equal to a value", () => {
      expect(service.typeOrmHost).toEqual("");
    });

    it.todo("typeOrmLogging should equal to a value");

    it("typeOrmPassword should equal to a value", () => {
      expect(service.typeOrmPassword).toEqual("");
    });

    it("typeOrmPort should equal to a value", () => {
      expect(service.typeOrmPort).toEqual("");
    });

    it("typeOrmSynchronize should equal to a value", () => {
      expect(service.typeOrmSynchronize).toEqual("");
    });

    it("typeOrmUsername should equal to a value", () => {
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

    it("mangooseRetryDelay should equal to a value", () => {
      expect(service.mangooseRetryDelay).toEqual(0);
    });
  });
});
