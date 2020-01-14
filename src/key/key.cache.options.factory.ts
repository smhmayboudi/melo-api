import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { KeyConfigService } from "./key.config.service";

@Injectable()
export class AuthCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly keyConfigService: KeyConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.keyConfigService.cacheHost,
      max: this.keyConfigService.cacheMax, // maximum number of items in cache
      port: this.keyConfigService.cachePort,
      store: redisStore,
      ttl: this.keyConfigService.cacheTTL // seconds
    };
  }
}
