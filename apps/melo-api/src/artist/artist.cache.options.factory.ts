import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { ArtistConfigService } from "./artist.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class ArtistCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly artistConfigService: ArtistConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.artistConfigService.cacheHost,
      max: this.artistConfigService.cacheMax,
      port: this.artistConfigService.cachePort,
      store:
        this.artistConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.artistConfigService.cacheTTL / 1000,
    };
  }
}
