import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";

import { ActionConfigService } from "./action.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class ActionCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly actionConfigService: ActionConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.actionConfigService.cacheHost,
      max: this.actionConfigService.cacheMax,
      port: this.actionConfigService.cachePort,
      store:
        this.actionConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.actionConfigService.cacheTTL / 1000
    };
  }
}
