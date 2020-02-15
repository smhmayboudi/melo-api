import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import redisStore from "cache-manager-ioredis";
import { SongConfigService } from "./song.config.service";

@Injectable()
export class SongCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly songConfigService: SongConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.songConfigService.cacheHost,
      max: this.songConfigService.cacheMax,
      port: this.songConfigService.cachePort,
      store: this.songConfigService.cacheStore === "none" ? "none" : redisStore,
      ttl: this.songConfigService.cacheTTL / 1000
    };
  }
}
