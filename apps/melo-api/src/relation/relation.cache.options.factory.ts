import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { RelationConfigService } from "./relation.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class RelationCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly relationConfigService: RelationConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.relationConfigService.cacheHost,
      max: this.relationConfigService.cacheMax,
      port: this.relationConfigService.cachePort,
      store:
        this.relationConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.relationConfigService.cacheTTL / 1000,
    };
  }
}
