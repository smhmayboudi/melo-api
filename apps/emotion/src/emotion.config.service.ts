import { ALBUM, ELASTICSEARCH_NODE, INDEX_NAME, MAX_SIZE } from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmotionConfigService implements EmotionConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get elasticsearchNode(): string {
    return this.configService.get<string>(`${ALBUM}.${ELASTICSEARCH_NODE}`, "");
  }

  get indexName(): string {
    return this.configService.get<string>(`${ALBUM}.${INDEX_NAME}`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${ALBUM}.${MAX_SIZE}`, 0);
  }
}
