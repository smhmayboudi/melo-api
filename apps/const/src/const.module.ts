import { ClientsModule, Transport } from "@nestjs/microservices";

import { ConstController } from "./const.controller";
import { ConstService } from "./const.service";
import { DATA_SERVICE } from "@melo/common";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ConstController],
  imports: [
    ClientsModule.register([
      {
        name: DATA_SERVICE,
        options: {
          url: process.env.DATA_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
  ],
  providers: [ConstService],
})
export class ConstModule {}
