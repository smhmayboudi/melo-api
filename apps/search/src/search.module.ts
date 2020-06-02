import { ALBUM_SERVICE, ARTIST_SERVICE, SONG_SERVICE } from "@melo/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

@Module({
  controllers: [SearchController],
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
    ElasticsearchModule.register({
      node: process.env.SEARCH_ELASTICSEARCH_NODE,
    }),
  ],
  providers: [SearchService],
})
export class SearchModule {}
