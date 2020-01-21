---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.cache.options.factory.ts
unless_exists: true
---
import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";
import { <%= h.changeCase.pascal(name)%>ConfigService } from "./<%= h.changeCase.dot(name)%>.config.service";

@Injectable()
export class <%= h.changeCase.pascal(name)%>CacheOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly <%= h.changeCase.camel(name)%>ConfigService: <%= h.changeCase.pascal(name)%>ConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {
      host: this.<%= h.changeCase.camel(name)%>ConfigService.cacheHost,
      max: this.<%= h.changeCase.camel(name)%>ConfigService.cacheMax,
      port: this.<%= h.changeCase.camel(name)%>ConfigService.cachePort,
      store: redisStore,
      ttl: this.<%= h.changeCase.camel(name)%>ConfigService.cacheTTL
    };
  }
}