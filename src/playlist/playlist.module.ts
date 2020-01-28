import { AppModule } from "../app.module";
import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./playlist.config";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaylistCacheOptionsFactory } from "./playlist.cache.options.factory";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistController } from "./playlist.controller";
import { PlaylistHealthIndicator } from "./playlist.health";
import { PlaylistService } from "./playlist.service";
import { PlaylistSchema } from "./playlist.schema";
import { DataModule } from "../data/data.module";

@Module({
  controllers: [PlaylistController],
  exports: [PlaylistConfigService, PlaylistHealthIndicator, PlaylistService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [PlaylistModule],
      useClass: PlaylistCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    DataModule,
    MongooseModule.forFeature([{ name: "Playlist", schema: PlaylistSchema }])
  ],
  providers: [PlaylistConfigService, PlaylistHealthIndicator, PlaylistService]
})
export class PlaylistModule {}
