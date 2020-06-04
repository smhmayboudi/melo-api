import { ARTIST_SERVICE, CONST_SERVICE, SONG_SERVICE } from "@melo/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AlbumConfigService } from "./album.config.service";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { ConfigModule } from "@nestjs/config";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { Module } from "@nestjs/common";
import config from "./album.config";

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
          url: process.env.CONST_SERVICE_URL,
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
    ConfigModule.forFeature(config),
    ElasticsearchModule.register({
      node: process.env.ALBUM_ELASTICSEARCH_NODE,
    }),
  ],
  providers: [AlbumConfigService, AlbumService],
})
export class AlbumModule {}
