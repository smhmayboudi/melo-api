import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./auth.config";
import { AuthConfigService } from "./auth.config.service";

describe("AuthService", () => {
  let service: AuthConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [AuthConfigService]
    }).compile();
    service = module.get<AuthConfigService>(AuthConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("jwtAccessTokenExpiresCount should be defined", () => {
    expect(service.jwtAccessTokenExpiresCount).toBeDefined();
  });

  it("jwtAccessTokenExpiresIn should be defined", () => {
    expect(service.jwtAccessTokenExpiresIn).toBeDefined();
  });

  it("jwtAuhSchema should be defined", () => {
    expect(service.jwtAuhSchema).toBeDefined();
  });

  it("jwtRefreshTokenExpiresIn should be defined", () => {
    expect(service.jwtRefreshTokenExpiresIn).toBeDefined();
  });

  it("telegramBotToken should be defined", () => {
    expect(service.telegramBotToken).toBeDefined();
  });

  it("telegramQueryExpiration should be defined", () => {
    expect(service.telegramQueryExpiration).toBeDefined();
  });
});
