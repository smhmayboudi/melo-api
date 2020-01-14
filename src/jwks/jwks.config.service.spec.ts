import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { JwksConfigService } from "./jwks.config.service";

describe("JwksService", () => {
  let service: JwksConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, JwksConfigService]
    }).compile();

    service = module.get<JwksConfigService>(JwksConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("cacheHost");
  test.todo("cacheMax");
  test.todo("cachePort");
  test.todo("cacheTTL");
  test.todo("typeOrmDatabase");
  test.todo("typeOrmHost");
  test.todo("typeOrmLogging");
  test.todo("typeOrmPassword");
  test.todo("typeOrmPort");
  test.todo("typeOrmSynchronize");
  test.todo("typeOrmUsername");
});
