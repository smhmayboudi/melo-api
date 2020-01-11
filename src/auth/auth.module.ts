import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import config from "./auth.config";
import { AuthConfigService } from "./auth.config.service";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { TelegramStrategy } from "./telegram.strategy";

@Module({
  exports: [AuthService],
  imports: [
    ConfigModule.forFeature(config),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" }
    }),
    PassportModule.register({
      defaultStrategy: "jwt",
      session: true
    }),
    UserModule
  ],
  providers: [
    AuthConfigService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    TelegramStrategy
  ]
})
export class AuthModule {}
