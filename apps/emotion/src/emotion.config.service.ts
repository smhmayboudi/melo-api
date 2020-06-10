import {
  ELASTICSEARCH_NODE,
  EMOTION,
  INDEX_NAME,
  MAX_SIZE,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmotionConfigService implements EmotionConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get elasticsearchNode(): string {
    return this.configService.get<string>(
      `${EMOTION}.${ELASTICSEARCH_NODE}`,
      ""
    );
  }

  get indexName(): string {
    return this.configService.get<string>(`${EMOTION}.${INDEX_NAME}`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${EMOTION}.${MAX_SIZE}`, 0);
  }
}
