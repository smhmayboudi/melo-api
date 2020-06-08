import {
  ALBUM_SERVICE,
  ARTIST_SERVICE,
  CONST_SERVICE,
  RELATION_SERVICE,
  USER_SERVICE,
} from "@melo/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { HttpModule, Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { SongCacheEntityRepository } from "./song.cache.entity.repository";
import { SongController } from "./song.controller";
import { SongElasticsearchOptionsFactory } from "./song.elasticsearch.options.factory";
import { SongHttpOptionsFactory } from "./song.http.options.factory";
import { SongService } from "./song.service";
import { SongSiteEntityRepository } from "./song.site.entity.repository";
import { SongTypeOrmOptionsFactory } from "./song.type-orm.options.factory";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./song.config";

@Module({
  controllers: [SongController],
  exports: [SongService],
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
      {
        name: USER_SERVICE,
        options: {
          url: process.env.USER_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forRoot(),
    ConfigModule.forFeature(config),
    ElasticsearchModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [SongModule],
      useClass: SongElasticsearchOptionsFactory,
    }),
    HttpModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [SongModule],
      useClass: SongHttpOptionsFactory,
    }),
    TypeOrmModule.forFeature([
      SongCacheEntityRepository,
      SongSiteEntityRepository,
    ]),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [SongModule],
      useClass: SongTypeOrmOptionsFactory,
    }),
  ],
  providers: [SongService],
})
export class SongModule {}
