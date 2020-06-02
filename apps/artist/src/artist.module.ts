import { ARTIST_SERVICE, CONST_SERVICE, RELATION_SERVICE } from "@melo/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ArtistController],
  imports: [
    ClientsModule.register([
      {
        name: ARTIST_SERVICE,
        options: {
          url: process.env.ARTIST_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
      {
        name: CONST_SERVICE,
        options: {
          url: process.env.ARTIST_SERVICE_URL,
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
