import { ClientsModule, Transport } from "@nestjs/microservices";
import { DATA_SERVICE, RELATION_SERVICE } from "@melo/common";

import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ArtistController],
  imports: [
    ClientsModule.register([
      {
        name: DATA_SERVICE,
        options: {
          url: process.env.DATA_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
      {
        name: RELATION_SERVICE,
        options: {
          url: process.env.RELATION_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
  ],
  providers: [ArtistService],
})
export class ArtistModule {}
