import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { AlbumConfigService } from "./album.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class AlbumCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly albumConfigService: AlbumConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.albumConfigService.cacheHost,
      max: this.albumConfigService.cacheMax,
      port: this.albumConfigService.cachePort,
      store:
        this.albumConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.albumConfigService.cacheTTL / 1000,
    };
  }
}
