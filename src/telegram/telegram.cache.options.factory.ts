import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { TelegramConfigService } from "./telegram.config.service";

@Injectable()
export class TelegramCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly telegramConfigService: TelegramConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.telegramConfigService.cacheHost,
      max: this.telegramConfigService.cacheMax,
      port: this.telegramConfigService.cachePort,
      store: redisStore,
      ttl: this.telegramConfigService.cacheTTL
    };
  }
}
