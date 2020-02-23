import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
// import { PromModule } from "../prom/prom.module";
import { DataAlbumService } from "./data.album.service";
import { DataArtistService } from "./data.artist.service";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataHealthIndicator } from "./data.health.indicator";
import { DataHttpModuleOptionsFactory } from "./data.http.options.factory";
import { DataSearchService } from "./data.search.service";
import { DataService } from "./data.service";
import { DataSongService } from "./data.song.service";

@Module({
  controllers: [],
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
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [DataModule],
      useClass: DataHttpModuleOptionsFactory
    })
    // PromModule.register({
    //   name: "data counter",
    //   labelNames: ["function", "module", "service"],
    //   name: "data"
    // })
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
