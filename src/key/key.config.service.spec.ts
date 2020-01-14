import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { KeyConfigService } from "./key.config.service";

describe("KeyService", () => {
  let service: KeyConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, KeyConfigService]
    }).compile();

    service = module.get<KeyConfigService>(KeyConfigService);
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
