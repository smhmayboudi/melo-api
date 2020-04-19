import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { SearchConfigService } from "./search.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class SearchCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly searchConfigService: SearchConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.searchConfigService.cacheHost,
      max: this.searchConfigService.cacheMax,
      port: this.searchConfigService.cachePort,
      store:
        this.searchConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.searchConfigService.cacheTTL / 1000,
    };
  }
}
