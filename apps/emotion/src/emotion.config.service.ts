import {
  ELASTICSEARCH_NODE,
  EMOTION,
  INDEX_NAME,
  MAX_SIZE,
  SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY,
  SERVICE_URL,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";
import { Injectable } from "@nestjs/common";
import ms from "ms";

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

  get servicePort(): number {
    return this.configService.get<number>(`${EMOTION}.${SERVICE_PORT}`, 0);
  }

  get serviceRetryAttempts(): number {
    return this.configService.get<number>(
      `${EMOTION}.${SERVICE_RETRY_ATTEMPTS}`,
      0
    );
  }

  get serviceRetryDelay(): number {
    return ms(
      this.configService.get<string>(`${EMOTION}.${SERVICE_RETRY_DELAY}`, "0")
    );
  }

  get serviceUrl(): string {
    return this.configService.get<string>(`${EMOTION}.${SERVICE_URL}`, "");
  }
}
