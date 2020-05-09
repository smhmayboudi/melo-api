import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { AtConfigService } from "./at.config.service";
import { CACHE_STORE_NONE } from "../app/app.constant";
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
        this.atConfigService.cacheStore === CACHE_STORE_NONE
          ? CACHE_STORE_NONE
          : redisStore,
      ttl: this.atConfigService.cacheTTL / 1000,
    };
  }
}
