import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import redisStore from "cache-manager-redis-store";
import { ConstConfigService } from "./const.config.service";

@Injectable()
export class ConstCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly constConfigService: ConstConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.constConfigService.cacheHost,
      max: this.constConfigService.cacheMax,
      port: this.constConfigService.cachePort,
      store:
        this.constConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.constConfigService.cacheTTL / 1000
    };
  }
}
