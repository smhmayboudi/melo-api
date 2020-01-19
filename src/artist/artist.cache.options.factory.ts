import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { ArtistConfigService } from "./artist.config.service";

@Injectable()
export class ArtistCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly artistConfigService: ArtistConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.artistConfigService.cacheHost,
      max: this.artistConfigService.cacheMax,
      port: this.artistConfigService.cachePort,
      store: redisStore,
      ttl: this.artistConfigService.cacheTTL
    };
  }
}
