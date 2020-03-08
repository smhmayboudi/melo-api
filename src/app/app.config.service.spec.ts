import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "./app.config.service";

describe("AppService", () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService]
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("apmLogLevel should be defined", () => {
    expect(service.apmLogLevel).toBeDefined();
  });

  it("apmSecretToken should be defined", () => {
    expect(service.apmSecretToken).toBeDefined();
  });

  it("apmServerUrl should be defined", () => {
    expect(service.apmServerUrl).toBeDefined();
  });

  it("apmServiceName should be defined", () => {
    expect(service.apmServiceName).toBeDefined();
  });

  it("cacheHost should be defined", () => {
    expect(service.cacheHost).toBeDefined();
  });

  it("cacheMax should be defined", () => {
    expect(service.cacheMax).toBeDefined();
  });

  it("cachePort should be defined", () => {
    expect(service.cachePort).toBeDefined();
  });

  it("cacheStore should be defined", () => {
    expect(service.cacheStore).toBeDefined();
  });

  it("cacheTTL should be defined", () => {
    expect(service.cacheTTL).toBeDefined();
  });

  it("hashIdAlphabet should be defined", () => {
    expect(service.hashIdAlphabet).toBeDefined();
  });

  it("hashIdMinLength should be defined", () => {
    expect(service.hashIdMinLength).toBeDefined();
  });

  it("hashIdSalt should be defined", () => {
    expect(service.hashIdSalt).toBeDefined();
  });

  it("hashIdSeps should be defined", () => {
    expect(service.hashIdSeps).toBeDefined();
  });

  it("imgProxyBaseUrl should be defined", () => {
    expect(service.imgProxyBaseUrl).toBeDefined();
  });

  it("imgProxyEncode should be defined", () => {
    expect(service.imgProxyEncode).toBeDefined();
  });

  it("imgProxyKey should be defined", () => {
    expect(service.imgProxyKey).toBeDefined();
  });

  it("imgProxySalt should be defined", () => {
    expect(service.imgProxySalt).toBeDefined();
  });

  it("imgProxySignatureSize should be defined", () => {
    expect(service.imgProxySignatureSize).toBeDefined();
  });

  it("imgProxyImageTypeSize should be defined", () => {
    expect(service.imgProxyImageTypeSize).toBeDefined();
  });

  it("mangooseRetryAttempts should be defined", () => {
    expect(service.mangooseRetryAttempts).toBeDefined();
  });

  it("mangooseRetryDelay should be defined", () => {
    expect(service.mangooseRetryDelay).toBeDefined();
  });

  it("mangooseUri should be defined", () => {
    expect(service.mangooseUri).toBeDefined();
  });

  it("port should be defined", () => {
    expect(service.port).toBeDefined();
  });

  it("promDefaultLabels should be defined", () => {
    expect(service.promDefaultLabels).toBeDefined();
  });

  it("promDefaultMetricsEnabled should be defined", () => {
    expect(service.promDefaultMetricsEnabled).toBeDefined();
  });

  it("promPath should be defined", () => {
    expect(service.promPath).toBeDefined();
  });

  it("promPrefix should be defined", () => {
    expect(service.promPrefix).toBeDefined();
  });

  it("rateLimitMax should be defined", () => {
    expect(service.rateLimitMax).toBeDefined();
  });

  it("rateLimitWindowMs should be defined", () => {
    expect(service.rateLimitWindowMs).toBeDefined();
  });

  it("sentryDebug should be defined", () => {
    expect(service.sentryDebug).toBeDefined();
  });

  it("sentryDsn should be defined", () => {
    expect(service.sentryDsn).toBeDefined();
  });

  it("sentryEnviroment should be defined", () => {
    expect(service.sentryEnviroment).toBeDefined();
  });

  it("sentryLogLevel should be defined", () => {
    expect(service.sentryLogLevel).toBeDefined();
  });

  it("sentryRelease should be defined", () => {
    expect(service.sentryRelease).toBeDefined();
  });

  it("typeOrmDatabase should be defined", () => {
    expect(service.typeOrmDatabase).toBeDefined();
  });

  it("typeOrmHost should be defined", () => {
    expect(service.typeOrmHost).toBeDefined();
  });

  it("typeOrmLogging should be defined", () => {
    expect(service.typeOrmLogging).toBeDefined();
  });

  it("typeOrmPassword should be defined", () => {
    expect(service.typeOrmPassword).toBeDefined();
  });

  it("typeOrmPort should be defined", () => {
    expect(service.typeOrmPort).toBeDefined();
  });

  it("typeOrmSynchronize should be defined", () => {
    expect(service.typeOrmSynchronize).toBeDefined();
  });

  it("typeOrmUsername should be defined", () => {
    expect(service.typeOrmUsername).toBeDefined();
  });
});
