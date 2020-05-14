/* eslint-disable @typescript-eslint/no-use-before-define */

import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { DATA_TYPEORM } from "../app/app.constant";
import { DataAlbumService } from "./data.album.service";
import { DataArtistService } from "./data.artist.service";
import { DataCacheEntityRepository } from "./data.cache.entity.repository";
import { DataConfigService } from "./data.config.service";
import { DataElasticsearchOptionsFactory } from "./data.elasticsearch.options.factory";
import { DataHealthIndicator } from "./data.health.indicator";
import { DataService } from "./data.service";
import { DataSiteEntityRepository } from "./data.site.entity.repository";
import { DataSongService } from "./data.song.service";
import { DataTransformService } from "./data.transform.service";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./data.config";

@Module({
  exports: [
    DataAlbumService,
    DataArtistService,
    DataConfigService,
    DataHealthIndicator,
    DataService,
    DataSongService,
    DataTransformService,
  ],
  imports: [
    forwardRef(() => AppModule),
    ConfigModule.forFeature(config),
    ElasticsearchModule.registerAsync({
      imports: [DataModule],
      useClass: DataElasticsearchOptionsFactory,
    }),
    TypeOrmModule.forFeature(
      [DataCacheEntityRepository, DataSiteEntityRepository],
      DATA_TYPEORM
    ),
  ],
  providers: [
    DataAlbumService,
    DataArtistService,
    DataConfigService,
    DataHealthIndicator,
    DataService,
    DataSongService,
    DataTransformService,
  ],
})
export class DataModule {}
