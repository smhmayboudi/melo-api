import {
  ELASTICSEARCH_NODE,
  INDEX_NAME,
  MAX_SIZE,
  SCRIPT_SCORE,
  SEARCH,
  SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY,
  SERVICE_URL,
  SUGGEST_INDEX,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { SearchConfigServiceInterface } from "./search.config.service.interface";
import ms from "ms";

@Injectable()
export class SearchConfigService implements SearchConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

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

  get servicePort(): number {
    return this.configService.get<number>(`${SEARCH}.${SERVICE_PORT}`, 0);
  }

  get serviceRetryAttempts(): number {
    return this.configService.get<number>(
      `${SEARCH}.${SERVICE_RETRY_ATTEMPTS}`,
      0
    );
  }

  get serviceRetryDelay(): number {
    return ms(
      this.configService.get<string>(`${SEARCH}.${SERVICE_RETRY_DELAY}`, "0")
    );
  }

  get serviceUrl(): string {
    return this.configService.get<string>(`${SEARCH}.${SERVICE_URL}`, "");
  }

  get suggestIndex(): string {
    return this.configService.get<string>(`${SEARCH}.${SUGGEST_INDEX}`, "");
  }
}
