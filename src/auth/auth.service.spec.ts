import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { RtModule } from "../rt/rt.module";
import { AppModule } from "../app.module";
import { AtModule } from "../at/at.module";
import { JwksModule } from "../jwks/jwks.module";
import config from "./auth.config";
import { AuthConfigService } from "./auth.config.service";
import { AuthJwtOptionsFactory } from "./auth.jwt.options.factory";
import { AuthModule } from "./auth.module";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        JwksModule,
        JwtModule.registerAsync({
          imports: [AuthModule, JwksModule],
          useClass: AuthJwtOptionsFactory
        }),
        AtModule,
        RtModule
      ],
      providers: [AuthConfigService, AuthService]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("accessToken");
  test.todo("refreshToken");
});
