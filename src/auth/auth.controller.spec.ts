import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { AtModule } from "../at/at.module";
import { JwksModule } from "../jwks/jwks.module";
import { RtModule } from "../rt/rt.module";
import { UserModule } from "../user/user.module";
import config from "./auth.config";
import { AuthConfigService } from "./auth.config.service";
import { AuthController } from "./auth.controller";
import { AuthJwtOptionsFactory } from "./auth.jwt.options.factory";
import { AuthModule } from "./auth.module";
import { AuthAuthOptionsFactory } from "./auth.options.factory";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        JwksModule,
        JwtModule.registerAsync({
          imports: [AuthModule, JwksModule],
          useClass: AuthJwtOptionsFactory
        }),
        PassportModule.registerAsync({
          imports: [AuthModule],
          useClass: AuthAuthOptionsFactory
        }),
        AtModule,
        RtModule,
        UserModule
      ],
      providers: [AuthConfigService, AuthService]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("test");
  test.todo("login");
  test.todo("logout");
  test.todo("telegram");
  test.todo("token");
});
