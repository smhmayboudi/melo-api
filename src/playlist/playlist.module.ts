import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppModule } from "../app.module";
import { PlaylistCacheOptionsFactory } from "./playlist.cache.options.factory";
import config from "./playlist.config";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistController } from "./playlist.controller";
import { PlaylistHealthIndicator } from "./playlist.health";
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
    ConfigModule.forFeature(config)
  ],
  providers: [PlaylistConfigService, PlaylistHealthIndicator, PlaylistService]
})
export class PlaylistModule {}
