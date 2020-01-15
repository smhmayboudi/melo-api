import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { JwksConfigService } from "./jwks.config.service";

@Injectable()
export class JwksCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly jwksConfigService: JwksConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.jwksConfigService.cacheHost,
      max: this.jwksConfigService.cacheMax,
      port: this.jwksConfigService.cachePort,
      store: redisStore,
      ttl: this.jwksConfigService.cacheTTL
    };
  }
}
