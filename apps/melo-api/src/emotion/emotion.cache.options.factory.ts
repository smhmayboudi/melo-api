import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { APP_CACHE_STORE_NONE } from "@melo/common";
import { EmotionConfigService } from "./emotion.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class EmotionCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly emotionConfigService: EmotionConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.emotionConfigService.cacheHost,
      max: this.emotionConfigService.cacheMax,
      port: this.emotionConfigService.cachePort,
      store:
        this.emotionConfigService.cacheStore === APP_CACHE_STORE_NONE
          ? APP_CACHE_STORE_NONE
          : redisStore,
      ttl: this.emotionConfigService.cacheTTL / 1000,
    };
  }
}
