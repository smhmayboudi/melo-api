import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { UserConfigService } from "./user.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class UserCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly userConfigService: UserConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.userConfigService.cacheHost,
      max: this.userConfigService.cacheMax,
      port: this.userConfigService.cachePort,
      store: this.userConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.userConfigService.cacheTTL / 1000,
    };
  }
}
