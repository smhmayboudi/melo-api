import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
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
        this.constConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.constConfigService.cacheTTL / 1000,
    };
  }
}
