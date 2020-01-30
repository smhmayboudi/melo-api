import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { JwksEntityRepository } from "../jwks/jwks.entity.repository";
import { JwksService } from "../jwks/jwks.service";
import { UserService } from "../user/user.service";
import { AuthConfigService } from "./auth.config.service";
import { TelegramStrategy } from "./telegram.strategy";

describe("TelegramStrategy", () => {
  let authConfigService: AuthConfigService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthConfigService,
        ConfigService,
        JwksEntityRepository,
        JwksService
      ]
    }).compile();

    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(new TelegramStrategy(authConfigService, userService)).toBeDefined();
  });
});
