import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import redisStore from "cache-manager-ioredis";
import { AppConfigService } from "./app.config.service";

@Injectable()
export class AppCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.appConfigService.cacheHost,
      max: this.appConfigService.cacheMax,
      port: this.appConfigService.cachePort,
      store: this.appConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.appConfigService.cacheTTL / 1000
    };
  }
}