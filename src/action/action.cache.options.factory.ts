import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { ActionConfigService } from "./action.config.service";
import { CACHE_STORE_NONE } from "../app/app.constant";
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
        this.actionConfigService.cacheStore === CACHE_STORE_NONE
          ? CACHE_STORE_NONE
          : redisStore,
      ttl: this.actionConfigService.cacheTTL / 1000,
    };
  }
}
