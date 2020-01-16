import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { TokenConfigService } from "./token.config.service";

@Injectable()
export class TokenCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly tokenConfigService: TokenConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.tokenConfigService.cacheHost,
      max: this.tokenConfigService.cacheMax,
      port: this.tokenConfigService.cachePort,
      store: redisStore,
      ttl: this.tokenConfigService.cacheTTL
    };
  }
}
