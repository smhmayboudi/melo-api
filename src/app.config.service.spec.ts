import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "./app.config.service";

describe("AppService", () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService, ConfigService]
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
  test.todo("mangooseConnectionName");
  test.todo("mangooseRetryAttempts");
  test.todo("mangooseRetryDelay");
  test.todo("mangooseUri");
  test.todo("port");
  test.todo("rateLimitMax");
  test.todo("rateLimitWindowMs");
  test.todo("typeOrmDatabase");
  test.todo("typeOrmHost");
  test.todo("typeOrmLogging");
  test.todo("typeOrmPassword");
  test.todo("typeOrmPort");
  test.todo("typeOrmSynchronize");
  test.todo("typeOrmUsername");
});
