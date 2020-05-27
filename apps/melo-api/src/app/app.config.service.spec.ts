import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "./app.config.service";
import { ConfigService } from "@nestjs/config";

describe("AppConfigService", () => {
  describe("get: boolean", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): boolean => true,
    };

    let service: AppConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
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

    it("apmActive should be equal to a value", () => {
      expect(service.apmActive).toEqual(true);
    });

    it("dgraphDebug should be equal to a value", () => {
      expect(service.dgraphDebug).toEqual(true);
    });

    it("promDefaultMetricsEnabled should be equal to a value", () => {
      expect(service.promDefaultMetricsEnabled).toEqual(true);
    });

    it("sentryDebug should be equal to a value", () => {
      expect(service.sentryDebug).toEqual(true);
    });

    it("typeOrmLogging should be equal to a value", () => {
      expect(service.typeOrmLogging).toEqual(true);
    });
  });

  describe("get: JSON", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => '{"a":0}',
    };

    let service: AppConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
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

    it("promDefaultLabels should be equal to a value", () => {
      expect(service.promDefaultLabels).toEqual({ a: 0 });
    });
  });

  describe("get: number", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): number => 0,
    };

    let service: AppConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
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
      get: (): string => "",
    };

    let service: AppConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
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

    it("dgraphAddress should be equal to a value", () => {
      expect(service.dgraphAddress).toEqual("");
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

    it("hashIdSeps should be equal to a value", () => {
      expect(service.hashIdSeps).toEqual("");
    });

    it("mangooseUri should be equal to a value", () => {
      expect(service.mangooseUri).toEqual("");
    });

    it("promPath should be equal to a value", () => {
      expect(service.promPath).toEqual("");
    });

    it("promPrefix should be equal to a value", () => {
      expect(service.promPrefix).toEqual("");
    });

    it.todo("rateLimitWindowMs should be equal to a value");

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
  });

  describe("get: string 0", () => {
    // TODO: interface ?
    const configServiceMock = {
      get: (): string => "0",
    };

    let service: AppConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
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

    it("mangooseRetryDelay should be equal to a value", () => {
      expect(service.mangooseRetryDelay).toEqual(0);
    });
  });
});
