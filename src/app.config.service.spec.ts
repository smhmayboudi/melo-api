import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";

describe("AppService", () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ConfigModule.forFeature(config)],
      providers: [AppConfigService]
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("cacheHost");
  test.todo("cacheMax");
  test.todo("cachePort");
  test.todo("cacheStore");
  test.todo("cacheTTL");
  test.todo("hashIdAlphabet");
  test.todo("hashIdMinLength");
  test.todo("hashIdSalt");
  test.todo("hashIdSeps");
  test.todo("imgProxyBaseUrl");
  test.todo("imgProxyEncode");
  test.todo("imgProxyKey");
  test.todo("imgProxySalt");
  test.todo("imgProxySignatureSize");
  test.todo("imgProxyImageTypeSize");
  test.todo("mangooseRetryAttempts");
  test.todo("mangooseRetryDelay");
  test.todo("mangooseUri");
  test.todo("port");
  test.todo("promClientPrefix");
  test.todo("rateLimitMax");
  test.todo("rateLimitWindowMs");
  test.todo("sentryDebug");
  test.todo("sentryDsn");
  test.todo("sentryEnviroment");
  test.todo("sentryLogLevel");
  test.todo("sentryRelease");
  test.todo("typeOrmDatabase");
  test.todo("typeOrmHost");
  test.todo("typeOrmLogging");
  test.todo("typeOrmPassword");
  test.todo("typeOrmPort");
  test.todo("typeOrmSynchronize");
  test.todo("typeOrmUsername");
});
