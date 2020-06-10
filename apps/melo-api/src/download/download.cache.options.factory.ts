import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { DownloadConfigService } from "./download.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class DownloadCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly downloadConfigService: DownloadConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.downloadConfigService.cacheHost,
      max: this.downloadConfigService.cacheMax,
      port: this.downloadConfigService.cachePort,
      store:
        this.downloadConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.downloadConfigService.cacheTTL / 1000,
    };
  }
}
