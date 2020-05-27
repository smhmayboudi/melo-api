import { ConfigModule } from "@nestjs/config";
import { DATA_TYPEORM } from "@melo/common";
import { DataAlbumController } from "./data.album.controller";
import { DataAlbumService } from "./data.album.service";
import { DataArtistController } from "./data.artist.controller";
import { DataArtistService } from "./data.artist.service";
import { DataCacheEntityRepository } from "./data.cache.entity.repository";
import { DataConfigService } from "./data.config.service";
import { DataImageService } from "./data.image.service";
import { DataSiteEntityRepository } from "./data.site.entity.repository";
import { DataSongController } from "./data.song.controller";
import { DataSongService } from "./data.song.service";
import { DataTransformService } from "./data.transform.service";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./data.config";

@Module({
  controllers: [
    DataAlbumController,
    DataArtistController,
    DataSongController,
    DataImageService,
    DataSongService,
    DataTransformService,
  ],
  imports: [
    ConfigModule.forFeature(config),
    ElasticsearchModule.register({
      node: process.env.DATA_ELASTICSEARCH_NODE,
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
    DataImageService,
    DataSongService,
    DataTransformService,
  ],
})
export class DataModule {}
