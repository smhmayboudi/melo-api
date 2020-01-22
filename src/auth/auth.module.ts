import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AtModule } from "src/at/at.module";
import { AppModule } from "../app.module";
import { JwksModule } from "../jwks/jwks.module";
import { RtModule } from "../rt/rt.module";
import { UserModule } from "../user/user.module";
import config from "./auth.config";
import { AuthConfigService } from "./auth.config.service";
import { AuthController } from "./auth.controller";
import { AuthJwtOptionsFactory } from "./auth.jwt.options.factory";
import { AuthAuthOptionsFactory } from "./auth.options.factory";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { TelegramStrategy } from "./telegram.strategy";
import { TokenStrategy } from "./token.strategy";
import { AuthHealthIndicator } from "./auth.health";

@Module({
  controllers: [AuthController],
  exports: [AuthConfigService, AuthHealthIndicator, AuthService],
  imports: [
    forwardRef(() => AppModule),
    ConfigModule.forFeature(config),
    JwksModule,
    JwtModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AuthModule, JwksModule],
      useClass: AuthJwtOptionsFactory
    }),
    PassportModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AuthModule],
      useClass: AuthAuthOptionsFactory
    }),
    AtModule,
    RtModule,
    UserModule
  ],
  providers: [
    AuthConfigService,
    AuthHealthIndicator,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    TelegramStrategy,
    TokenStrategy
  ]
})
export class AuthModule {}
