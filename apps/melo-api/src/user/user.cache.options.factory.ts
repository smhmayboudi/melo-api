import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { UserConfigService } from "./user.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class UserCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly userConfigService: UserConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.userConfigService.cacheHost,
      max: this.userConfigService.cacheMax,
      port: this.userConfigService.cachePort,
      store:
        this.userConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.userConfigService.cacheTTL / 1000,
    };
  }
}
