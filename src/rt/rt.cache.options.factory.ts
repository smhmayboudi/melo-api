import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import redisStore from "cache-manager-redis-store";
import { RtConfigService } from "./rt.config.service";

@Injectable()
export class RtCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly rtConfigService: RtConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.rtConfigService.cacheHost,
      max: this.rtConfigService.cacheMax,
      port: this.rtConfigService.cachePort,
      store: this.rtConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.rtConfigService.cacheTTL
    };
  }
}
