import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { AlbumConfigService } from "./album.config.service";
import { CACHE_STORE_NONE } from "../app/app.constant";
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
        this.albumConfigService.cacheStore === CACHE_STORE_NONE
          ? CACHE_STORE_NONE
          : redisStore,
      ttl: this.albumConfigService.cacheTTL / 1000,
    };
  }
}
