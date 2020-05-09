import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { CACHE_STORE_NONE } from "../app/app.constant";
import { JwksConfigService } from "./jwks.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class JwksCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly jwksConfigService: JwksConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.jwksConfigService.cacheHost,
      max: this.jwksConfigService.cacheMax,
      port: this.jwksConfigService.cachePort,
      store:
        this.jwksConfigService.cacheStore === CACHE_STORE_NONE
          ? CACHE_STORE_NONE
          : redisStore,
      ttl: this.jwksConfigService.cacheTTL / 1000,
    };
  }
}
