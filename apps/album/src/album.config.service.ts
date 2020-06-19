import {
  ALBUM,
  ELASTICSEARCH_NODE,
  IMAGE_PATH,
  IMAGE_PATH_DEFAULT,
  INDEX_NAME,
  MAX_SIZE,
  SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY,
  SERVICE_URL,
} from "@melo/common";

import { AlbumConfigServiceInterface } from "./album.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class AlbumConfigService implements AlbumConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get elasticsearchNode(): string {
    return this.configService.get<string>(`${ALBUM}.${ELASTICSEARCH_NODE}`, "");
  }

  get imagePath(): string {
    return this.configService.get<string>(`${ALBUM}.${IMAGE_PATH}`, "");
  }

  get imagePathDefaultAlbum(): string {
    return this.configService.get<string>(`${ALBUM}.${IMAGE_PATH_DEFAULT}`, "");
  }

  get indexName(): string {
    return this.configService.get<string>(`${ALBUM}.${INDEX_NAME}`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${ALBUM}.${MAX_SIZE}`, 0);
  }

  get servicePort(): number {
    return this.configService.get<number>(`${ALBUM}.${SERVICE_PORT}`, 0);
  }

  get serviceRetryAttempts(): number {
    return this.configService.get<number>(
      `${ALBUM}.${SERVICE_RETRY_ATTEMPTS}`,
      0
    );
  }

  get serviceRetryDelay(): number {
    return ms(
      this.configService.get<string>(`${ALBUM}.${SERVICE_RETRY_DELAY}`, "0")
    );
  }

  get serviceUrl(): string {
    return this.configService.get<string>(`${ALBUM}.${SERVICE_URL}`, "");
  }
}
