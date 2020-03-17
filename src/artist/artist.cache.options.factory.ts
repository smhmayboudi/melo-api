import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";

import { ArtistConfigService } from "./artist.config.service";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class ArtistCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly artistConfigService: ArtistConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.artistConfigService.cacheHost,
      max: this.artistConfigService.cacheMax,
      port: this.artistConfigService.cachePort,
      store:
        this.artistConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.artistConfigService.cacheTTL / 1000
    };
  }
}
