import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";

import { PlaylistConfigService } from "./playlist.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class PlaylistCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly playlistConfigService: PlaylistConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.playlistConfigService.cacheHost,
      max: this.playlistConfigService.cacheMax,
      port: this.playlistConfigService.cachePort,
      store:
        this.playlistConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.playlistConfigService.cacheTTL / 1000
    };
  }
}
