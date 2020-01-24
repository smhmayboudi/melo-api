import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import redisStore from "cache-manager-redis-store";
import { SearchConfigService } from "./search.config.service";

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
      ttl: this.searchConfigService.cacheTTL
    };
  }
}
