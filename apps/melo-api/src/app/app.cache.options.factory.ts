import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { AppConfigService } from "./app.config.service";
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
        this.appConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.appConfigService.cacheTTL / 1000,
    };
  }
}
