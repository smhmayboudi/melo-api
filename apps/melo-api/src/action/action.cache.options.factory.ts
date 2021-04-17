import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { ActionConfigService } from "./action.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class ActionCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly actionConfigService: ActionConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.actionConfigService.cacheHost,
      max: this.actionConfigService.cacheMax,
      port: this.actionConfigService.cachePort,
      store:
        this.actionConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.actionConfigService.cacheTTL / 1000,
    };
  }
}
