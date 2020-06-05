import { ARTIST_SERVICE, CONST_SERVICE, SONG_SERVICE } from "@melo/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AlbumConfigService } from "./album.config.service";
import { AlbumController } from "./album.controller";
import { AlbumElasticsearchOptionsFactory } from "./album.elasticsearch.options.factory";
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
    ElasticsearchModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AlbumModule],
      useClass: AlbumElasticsearchOptionsFactory,
    }),
  ],
  providers: [AlbumConfigService, AlbumService],
})
export class AlbumModule {}
