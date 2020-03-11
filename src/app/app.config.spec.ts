import config from "./app.config";

describe("AppConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      apmLogLevel: undefined,
      apmSecretToken: undefined,
      apmServerUrl: undefined,
      apmServiceName: undefined,
      cacheHost: undefined,
      cacheMax: undefined,
      cachePort: undefined,
      cacheStore: undefined,
      cacheTTL: undefined,
      hashIdAlphabet: undefined,
      hashIdMinLength: undefined,
      hashIdSalt: undefined,
      hashIdSeps: undefined,
      imgProxyBaseUrl: undefined,
      imgProxyEncode: undefined,
      imgProxyKey: undefined,
      imgProxySalt: undefined,
      imgProxySignatureSize: undefined,
      imgProxyTypeSize: undefined,
      mangooseRetryAttempts: undefined,
      mangooseRetryDelay: undefined,
      mangooseUri: undefined,
      port: undefined,
      promDefaultLabels: undefined,
      promDefaultMetricsEnabled: undefined,
      promPath: undefined,
      promPrefix: undefined,
      rateLimitMax: undefined,
      rateLimitWindowMs: undefined,
      sentryDebug: undefined,
      sentryDsn: undefined,
      sentryEnviroment: undefined,
      sentryLogLevel: undefined,
      sentryRelease: undefined,
      typeOrmDatabase: undefined,
      typeOrmHost: undefined,
      typeOrmLogging: undefined,
      typeOrmPassword: undefined,
      typeOrmPort: undefined,
      typeOrmSynchronize: undefined,
      typeOrmUsername: undefined
    });
  });
});
