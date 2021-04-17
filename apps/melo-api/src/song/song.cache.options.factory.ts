import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { SongConfigService } from "./song.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class SongCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly songConfigService: SongConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.songConfigService.cacheHost,
      max: this.songConfigService.cacheMax,
      port: this.songConfigService.cachePort,
      store:
        this.songConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.songConfigService.cacheTTL / 1000,
    };
  }
}
