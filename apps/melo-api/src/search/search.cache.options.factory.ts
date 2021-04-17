import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { SearchConfigService } from "./search.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class SearchCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly searchConfigService: SearchConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.searchConfigService.cacheHost,
      max: this.searchConfigService.cacheMax,
      port: this.searchConfigService.cachePort,
      store:
        this.searchConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.searchConfigService.cacheTTL / 1000,
    };
  }
}
