import { CONST_SERVICE, RELATION_SERVICE } from "@melo/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ArtistConfigService } from "./artist.config.service";
import { ArtistController } from "./artist.controller";
import { ArtistElasticsearchOptionsFactory } from "./artist.elasticsearch.options.factory";
import { ArtistEventsGateway } from "./artist.events.gateway";
import { ArtistService } from "./artist.service";
import { ConfigModule } from "@nestjs/config";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { Module } from "@nestjs/common";
import config from "./artist.config";

@Module({
  controllers: [ArtistController],
  exports: [ArtistConfigService, ArtistService],
  imports: [
    ClientsModule.register([
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
    ConfigModule.forRoot(),
    ElasticsearchModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [ArtistModule],
      useClass: ArtistElasticsearchOptionsFactory,
    }),
  ],
  providers: [ArtistConfigService, ArtistEventsGateway, ArtistService],
})
export class ArtistModule {}
