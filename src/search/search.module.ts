/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppModule } from "../app/app.module";
import { DataModule } from "../data/data.module";
import { SongModule } from "../song/song.module";
import { SearchCacheOptionsFactory } from "./search.cache.options.factory";
import config from "./search.config";
import { SearchConfigService } from "./search.config.service";
import { SearchController } from "./search.controller";
import { SearchHealthIndicator } from "./search.health.indicator";
import { SearchService } from "./search.service";

@Module({
  controllers: [SearchController],
  exports: [SearchConfigService, SearchHealthIndicator, SearchService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [SearchModule],
      useClass: SearchCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    DataModule,
    SongModule
  ],
  providers: [SearchConfigService, SearchHealthIndicator, SearchService]
})
export class SearchModule {}
