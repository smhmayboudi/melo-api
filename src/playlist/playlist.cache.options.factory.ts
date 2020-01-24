import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import redisStore from "cache-manager-redis-store";
import { PlaylistConfigService } from "./playlist.config.service";

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
      ttl: this.playlistConfigService.cacheTTL
    };
  }
}
