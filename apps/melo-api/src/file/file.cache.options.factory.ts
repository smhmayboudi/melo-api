import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { FileConfigService } from "./file.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class FileCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly fileConfigService: FileConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.fileConfigService.cacheHost,
      max: this.fileConfigService.cacheMax,
      port: this.fileConfigService.cachePort,
      store:
        this.fileConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.fileConfigService.cacheTTL / 1000,
    };
  }
}
