import { ALBUM_SERVICE, ARTIST_SERVICE, SONG_SERVICE } from "@melo/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ConfigModule } from "@nestjs/config";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { SearchElasticsearchOptionsFactory } from "./search.elasticsearch.options.factory";
import { SearchService } from "./search.service";
import config from "./search.config";

@Module({
  controllers: [SearchController],
  exports: [SearchService],
  imports: [
    ClientsModule.register([
      {
        name: ALBUM_SERVICE,
        options: {
          url: process.env.ALBUM_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
      {
        name: ARTIST_SERVICE,
        options: {
          url: process.env.ARTIST_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
      {
        name: SONG_SERVICE,
        options: {
          url: process.env.SONG_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forRoot(),
    ConfigModule.forFeature(config),
    ElasticsearchModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [SearchModule],
      useClass: SearchElasticsearchOptionsFactory,
    }),
  ],
  providers: [SearchService],
})
export class SearchModule {}
