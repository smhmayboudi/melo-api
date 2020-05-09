import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { CACHE_STORE_NONE } from "../app/app.constant";
import { ConstConfigService } from "./const.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class ConstCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly constConfigService: ConstConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.constConfigService.cacheHost,
      max: this.constConfigService.cacheMax,
      port: this.constConfigService.cachePort,
      store:
        this.constConfigService.cacheStore === CACHE_STORE_NONE
          ? CACHE_STORE_NONE
          : redisStore,
      ttl: this.constConfigService.cacheTTL / 1000,
    };
  }
}
