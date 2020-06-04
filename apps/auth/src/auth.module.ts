import { ClientsModule, Transport } from "@nestjs/microservices";
import { JWKS_SERVICE, RT_SERVICE } from "@melo/common";

import { AuthConfigService } from "./auth.config.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import config from "./auth.config";

@Module({
  controllers: [AuthController],
  imports: [
    ClientsModule.register([
      {
        name: JWKS_SERVICE,
        options: {
          url: process.env.JWKS_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
      {
        name: RT_SERVICE,
        options: {
          url: process.env.RT_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
  ],
  providers: [AuthConfigService, AuthService],
})
export class AuthModule {}
