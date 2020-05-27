import { ClientsModule, Transport } from "@nestjs/microservices";
import { JWKS_SERVICE, RT_SERVICE } from "@melo/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";

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
  ],
  providers: [AuthService],
})
export class AuthModule {}
