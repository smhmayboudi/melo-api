import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { UserConfigService } from "./user.config.service";

describe("UserService", () => {
  let service: UserConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, UserConfigService]
    }).compile();

    service = module.get<UserConfigService>(UserConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("cacheHost");
  test.todo("cacheMax");
  test.todo("cachePort");
  test.todo("cacheStore");
  test.todo("cacheTTL");
});
