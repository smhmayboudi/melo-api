import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { TelegramStrategy } from "./telegram.strategy";

@Module({
  exports: [AuthService],
  imports: [
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
  providers: [AuthService, LocalStrategy, JwtStrategy, TelegramStrategy]
})
export class AuthModule {}
