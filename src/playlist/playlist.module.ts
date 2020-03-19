/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, Module, forwardRef } from "@nestjs/common";
import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { DataModule } from "../data/data.module";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaylistCacheOptionsFactory } from "./playlist.cache.options.factory";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistController } from "./playlist.controller";
// import { PlaylistHealthIndicator } from "./playlist.health.indicator";
import { PlaylistSchema } from "./playlist.schema";
import { PlaylistService } from "./playlist.service";
import config from "./playlist.config";

@Module({
  controllers: [PlaylistController],
  exports: [
    PlaylistConfigService,
    // PlaylistHealthIndicator,
    PlaylistService
  ],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [PlaylistModule],
      useClass: PlaylistCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    DataModule,
    MongooseModule.forFeature([{ name: "Playlist", schema: PlaylistSchema }])
  ],
  providers: [
    PlaylistConfigService,
    // PlaylistHealthIndicator,
    PlaylistService
  ]
})
export class PlaylistModule {}
