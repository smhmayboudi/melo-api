import { ARTIST_SERVICE, CONST_SERVICE, RELATION_SERVICE } from "@melo/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ArtistConfigService } from "./artist.config.service";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import config from "./artist.config";

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
          url: process.env.CONST_SERVICE_URL,
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
    ConfigModule.forFeature(config),
  ],
  providers: [ArtistConfigService, ArtistService],
})
export class ArtistModule {}
