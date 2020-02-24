import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppModule } from "../app/app.module";
import { DataModule } from "../data/data.module";
import { PromModule } from "../prom/prom.module";
import { PlaylistCacheOptionsFactory } from "./playlist.cache.options.factory";
import config from "./playlist.config";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistController } from "./playlist.controller";
import { PlaylistHealthIndicator } from "./playlist.health.indicator";
import { PlaylistSchema } from "./playlist.schema";
import { PlaylistService } from "./playlist.service";

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
    MongooseModule.forFeature([{ name: "Playlist", schema: PlaylistSchema }]),
    PromModule.forCounter({
      help: "counter",
      labelNames: ["function", "module", "service"],
      name: "playlist"
    })
  ],
  providers: [PlaylistConfigService, PlaylistHealthIndicator, PlaylistService]
})
export class PlaylistModule {}
