import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { FileConfigService } from "./file.config.service";

@Injectable()
export class FileCacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly fileConfigService: FileConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.fileConfigService.cacheHost,
      max: this.fileConfigService.cacheMax,
      port: this.fileConfigService.cachePort,
      store: redisStore,
      ttl: this.fileConfigService.cacheTTL,
      storage: this.fileConfigService.storage
    };
  }
}
