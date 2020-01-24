import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import redisStore from "cache-manager-redis-store";
import { AlbumConfigService } from "./album.config.service";

@Injectable()
export class AlbumCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly albumConfigService: AlbumConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.albumConfigService.cacheHost,
      max: this.albumConfigService.cacheMax,
      port: this.albumConfigService.cachePort,
      store:
        this.albumConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.albumConfigService.cacheTTL
    };
  }
}
