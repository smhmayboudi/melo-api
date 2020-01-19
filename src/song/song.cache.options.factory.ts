import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { SongConfigService } from "./song.config.service";

@Injectable()
export class SongCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly songConfigService: SongConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.songConfigService.cacheHost,
      max: this.songConfigService.cacheMax,
      port: this.songConfigService.cachePort,
      store: redisStore,
      ttl: this.songConfigService.cacheTTL
    };
  }
}
