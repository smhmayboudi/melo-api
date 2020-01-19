import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PlaylistCacheOptionsFactory } from "./playlist.cache.options.factory";
import config from "./playlist.config";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistController } from "./playlist.controller";
import { PlaylistService } from "./playlist.service";

@Module({
  controllers: [PlaylistController],
  exports: [PlaylistConfigService, PlaylistService],
  imports: [
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [PlaylistModule],
      useClass: PlaylistCacheOptionsFactory
    }),
    ConfigModule.forFeature(config)
  ],
  providers: [PlaylistConfigService, PlaylistService]
})
export class PlaylistModule {}
