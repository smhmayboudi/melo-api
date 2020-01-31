import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import config from "./auth.config";
import { AuthConfigService } from "./auth.config.service";
import { TelegramStrategy } from "./telegram.strategy";

describe("TelegramStrategy", () => {
  let authConfigService: AuthConfigService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        UserModule
      ],
      providers: [AuthConfigService]
    }).compile();

    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(new TelegramStrategy(authConfigService, userService)).toBeDefined();
  });
});
