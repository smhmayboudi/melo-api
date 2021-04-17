import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { AtConfigService } from "./at.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class AtCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly atConfigService: AtConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.atConfigService.cacheHost,
      max: this.atConfigService.cacheMax,
      port: this.atConfigService.cachePort,
      store:
        this.atConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.atConfigService.cacheTTL / 1000,
    };
  }
}
