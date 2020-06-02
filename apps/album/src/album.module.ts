import { ARTIST_SERVICE, CONST_SERVICE, SONG_SERVICE } from "@melo/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { Module } from "@nestjs/common";

@Module({
  controllers: [AlbumController],
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
        name: SONG_SERVICE,
        options: {
          url: process.env.SONG_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ElasticsearchModule.register({
      node: process.env.ALBUM_ELASTICSEARCH_NODE,
    }),
  ],
  providers: [AlbumService],
})
export class AlbumModule {}
