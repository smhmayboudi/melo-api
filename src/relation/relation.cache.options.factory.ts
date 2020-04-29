import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";

import { RelationConfigService } from "./relation.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class RelationCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly relationConfigService: RelationConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.relationConfigService.cacheHost,
      max: this.relationConfigService.cacheMax,
      port: this.relationConfigService.cachePort,
      store:
        this.relationConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.relationConfigService.cacheTTL / 1000,
    };
  }
}
