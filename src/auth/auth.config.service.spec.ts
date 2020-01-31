import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import config from "./auth.config";
import { AuthConfigService } from "./auth.config.service";

describe("AuthService", () => {
  let service: AuthConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [AuthConfigService]
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
