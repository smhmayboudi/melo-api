import { ClientsModule, Transport } from "@nestjs/microservices";

import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { DATA_SERVICE } from "@melo/common";
import { Module } from "@nestjs/common";

@Module({
  controllers: [AlbumController],
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
  providers: [AlbumService],
})
export class AlbumModule {}
