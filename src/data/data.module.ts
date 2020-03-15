/* eslint-disable @typescript-eslint/no-use-before-define */

import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DataAlbumService } from "./data.album.service";
import { DataArtistService } from "./data.artist.service";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataHealthIndicator } from "./data.health.indicator";
import { DataHttpOptionsFactory } from "./data.http.options.factory";
import { DataSearchService } from "./data.search.service";
import { DataService } from "./data.service";
import { DataSongService } from "./data.song.service";

@Module({
  exports: [
    DataAlbumService,
    DataHealthIndicator,
    DataArtistService,
    DataConfigService,
    DataSearchService,
    DataService,
    DataSongService
  ],
  imports: [
    ConfigModule.forFeature(config),
    HttpModule.registerAsync({
      imports: [DataModule],
      useClass: DataHttpOptionsFactory
    })
  ],
  providers: [
    DataAlbumService,
    DataHealthIndicator,
    DataArtistService,
    DataConfigService,
    DataSearchService,
    DataService,
    DataSongService
  ]
})
export class DataModule {}
