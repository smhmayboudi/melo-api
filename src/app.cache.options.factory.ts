import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { AppConfigService } from "./app.config.service";

@Injectable()
export class AppCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.appConfigService.cacheHost,
      max: this.appConfigService.cacheMax,
      port: this.appConfigService.cachePort,
      store: redisStore,
      ttl: this.appConfigService.cacheTTL
    };
  }
}
