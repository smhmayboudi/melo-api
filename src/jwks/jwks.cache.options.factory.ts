import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import redisStore from "cache-manager-ioredis";
import { JwksConfigService } from "./jwks.config.service";

@Injectable()
export class JwksCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly jwksConfigService: JwksConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.jwksConfigService.cacheHost,
      max: this.jwksConfigService.cacheMax,
      port: this.jwksConfigService.cachePort,
      store: this.jwksConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.jwksConfigService.cacheTTL / 1000
    };
  }
}
