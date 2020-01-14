import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AppModule } from "src/app.module";
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
import { KeyModule } from "../key/key.module";

@Module({
  controllers: [AuthController],
  exports: [AuthConfigService, AuthService],
  imports: [
    forwardRef(() => AppModule),
    ConfigModule.forFeature(config),
    KeyModule,
    JwtModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AuthModule],
      useClass: AuthJwtOptionsFactory
    }),
    PassportModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AuthModule],
      useClass: AuthAuthOptionsFactory
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
