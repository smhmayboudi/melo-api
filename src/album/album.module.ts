/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, Module, forwardRef } from "@nestjs/common";

import { AlbumCacheOptionsFactory } from "./album.cache.options.factory";
import { AlbumConfigService } from "./album.config.service";
import { AlbumController } from "./album.controller";
import { AlbumHealthIndicator } from "./album.health.indicator";
import { AlbumService } from "./album.service";
import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { DataModule } from "../data/data.module";
import config from "./album.config";

@Module({
  controllers: [AlbumController],
  exports: [AlbumConfigService, AlbumHealthIndicator, AlbumService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [AlbumModule],
      useClass: AlbumCacheOptionsFactory,
    }),
    ConfigModule.forFeature(config),
    DataModule,
  ],
  providers: [AlbumConfigService, AlbumHealthIndicator, AlbumService],
})
export class AlbumModule {}
