import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "./app.config.service";
import { AppConfigServiceInterface } from "./app.config.service.interface";
import { AppMongooseOptionsFactory } from "./app.mongoose.options.factory";

describe("AppMongooseOptionsFactory", () => {
  const appConfigServiceMock: AppConfigServiceInterface = {
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
    imgProxyTypeSize: [{ name: "cover", height: 1024, width: 1024 }],
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
    typeOrmUsername: ""
  };

  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AppConfigService, useValue: appConfigServiceMock }]
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(new AppMongooseOptionsFactory(service)).toBeDefined();
  });

  it("createMongooseOptions should be equal to a value", () => {
    expect(
      new AppMongooseOptionsFactory(service).createMongooseOptions()
    ).toEqual({
      retryAttempts: 0,
      retryDelay: 0,
      uri: "",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
});
