import { MetricType, PromModule } from "@digikare/nestjs-prom";
import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AppModule } from "../app/app.module";
import { AtModule } from "../at/at.module";
import { JwksModule } from "../jwks/jwks.module";
import { RtModule } from "../rt/rt.module";
import { UserModule } from "../user/user.module";
import { AnonymUUIDStrategy } from "./anonym-uuid.strategy";
import config from "./auth.config";
import { AuthConfigService } from "./auth.config.service";
import { AuthController } from "./auth.controller";
import { AuthHealthIndicator } from "./auth.health.indicator";
import { AuthJwtOptionsFactory } from "./auth.jwt.options.factory";
import { AuthAuthOptionsFactory } from "./auth.options.factory";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { TelegramStrategy } from "./telegram.strategy";
import { TokenStrategy } from "./token.strategy";

@Module({
  controllers: [AuthController],
  exports: [AuthConfigService, AuthHealthIndicator, AuthService],
  imports: [
    forwardRef(() => AppModule),
    AtModule,
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
    PromModule.forMetrics([
      {
        type: MetricType.Counter,
        configuration: {
          help: "auth counter",
          labelNames: ["function", "module", "service"],
          name: "auth_counter"
        }
      }
    ]),
    RtModule,
    UserModule
  ],
  providers: [
    AnonymUUIDStrategy,
    AuthConfigService,
    AuthHealthIndicator,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    TelegramStrategy,
    TokenStrategy
  ]
})
export class AuthModule {}
