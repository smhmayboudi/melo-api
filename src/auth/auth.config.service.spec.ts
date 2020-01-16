import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthConfigService } from "./auth.config.service";

describe("AuthService", () => {
  let service: AuthConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthConfigService, ConfigService]
    }).compile();

    service = module.get<AuthConfigService>(AuthConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("jwtAccessTokenExpiresInAmount");
  test.todo("jwtAccessTokenExpiresInUnit");
  test.todo("jwtAuhSchema");
  test.todo("jwtRefreshTokenExpiresIn");
  test.todo("telegramBotToken");
  test.todo("telegramQueryExpiration");
});
