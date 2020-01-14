import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { JwksConfigService } from "./jwks.config.service";

@Injectable()
export class AuthCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly jwksConfigService: JwksConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.jwksConfigService.cacheHost,
      max: this.jwksConfigService.cacheMax, // maximum number of items in cache
      port: this.jwksConfigService.cachePort,
      store: redisStore,
      ttl: this.jwksConfigService.cacheTTL // seconds
    };
  }
}
