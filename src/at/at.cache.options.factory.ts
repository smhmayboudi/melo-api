import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { AtConfigService } from "./at.config.service";

@Injectable()
export class AtCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly atConfigService: AtConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.atConfigService.cacheHost,
      max: this.atConfigService.cacheMax,
      port: this.atConfigService.cachePort,
      store: this.atConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.atConfigService.cacheTTL
    };
  }
}
