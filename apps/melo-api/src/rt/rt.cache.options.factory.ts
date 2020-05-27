import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { RtConfigService } from "./rt.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class RtCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly rtConfigService: RtConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.rtConfigService.cacheHost,
      max: this.rtConfigService.cacheMax,
      port: this.rtConfigService.cachePort,
      store:
        this.rtConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.rtConfigService.cacheTTL / 1000,
    };
  }
}
