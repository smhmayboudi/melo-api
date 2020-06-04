import {
  ELASTICSEARCH_NODE,
  INDEX_NAME,
  MAX_SIZE,
  SCRIPT_SCORE,
  SEARCH,
  SUGGEST_INDEX,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { SearchConfigServiceInterface } from "./search.config.service.interface";

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

  get suggestIndex(): string {
    return this.configService.get<string>(`${SEARCH}.${SUGGEST_INDEX}`, "");
  }
}
