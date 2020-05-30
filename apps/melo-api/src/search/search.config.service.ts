import {
  CACHE_HOST,
  CACHE_MAX,
  CACHE_PORT,
  CACHE_STORE,
  CACHE_TTL,
  ELASTICSEARCH_NODE,
  INDEX_NAME,
  MAX_SIZE,
  SCRIPT_SCORE,
  SEARCH,
  SUGGEST_INDEX,
} from "@melo/common";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { SearchConfigServiceInterface } from "./search.config.service.interface";
import ms from "ms";

@Injectable()
export class SearchConfigService implements SearchConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      `${SEARCH}.${CACHE_HOST}`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${SEARCH}.${CACHE_MAX}`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${SEARCH}.${CACHE_PORT}`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${SEARCH}.${CACHE_STORE}`,
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${SEARCH}.${CACHE_TTL}`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

  get elasticsearchNode(): string {
    return this.configService.get<string>(
      `${SEARCH}.${ELASTICSEARCH_NODE}`,
      ""
    );
  }

  get scriptScore(): string {
    return this.configService.get<string>(`${SEARCH}.${SCRIPT_SCORE}`, "");
  }

  get indexName(): string {
    return this.configService.get<string>(`${SEARCH}.${INDEX_NAME}`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${SEARCH}.${MAX_SIZE}`, 0);
  }

  get suggestIndex(): string {
    return this.configService.get<string>(`${SEARCH}.${SUGGEST_INDEX}`, "");
  }
}
