import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { JwksModule } from "../jwks/jwks.module";
import { JwksService } from "../jwks/jwks.service";
import config from "./auth.config";
import { AuthConfigService } from "./auth.config.service";
import { AuthJwtOptionsFactory } from "./auth.jwt.options.factory";
import { AuthModule } from "./auth.module";

describe("AuthJwtOptionsFactory", () => {
  let authConfigService: AuthConfigService;
  let jwksService: JwksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        AuthModule,
        ConfigModule.forFeature(config),
        JwksModule,
        JwtModule.registerAsync({
          imports: [AuthModule, JwksModule],
          useClass: AuthJwtOptionsFactory
        })
      ],
      providers: [AuthConfigService]
    }).compile();
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);
  });

  it("should be defined", () => {
    expect(
      new AuthJwtOptionsFactory(authConfigService, jwksService)
    ).toBeDefined();
  });
});
