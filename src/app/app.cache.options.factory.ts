import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { AppConfigService } from "./app.config.service";
import { CACHE_STORE_NONE } from "./app.constant";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class AppCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.appConfigService.cacheHost,
      max: this.appConfigService.cacheMax,
      port: this.appConfigService.cachePort,
      store:
        this.appConfigService.cacheStore === CACHE_STORE_NONE
          ? CACHE_STORE_NONE
          : redisStore,
      ttl: this.appConfigService.cacheTTL / 1000,
    };
  }
}
