import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { UserConfigService } from "./user.config.service";

@Injectable()
export class AuthCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly userConfigService: UserConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.userConfigService.cacheHost,
      max: this.userConfigService.cacheMax,
      port: this.userConfigService.cachePort,
      store: redisStore,
      ttl: this.userConfigService.cacheTTL
    };
  }
}
