import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { TokenConfigService } from "./token.config.service";

describe("TokenService", () => {
  let service: TokenConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, TokenConfigService]
    }).compile();

    service = module.get<TokenConfigService>(TokenConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("cacheHost");
  test.todo("cacheMax");
  test.todo("cachePort");
  test.todo("cacheTTL");
});
