import {
  ARTIST,
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

import { ArtistConfigServiceInterface } from "./artist.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class ArtistConfigService implements ArtistConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get elasticsearchNode(): string {
    return this.configService.get<string>(
      `${ARTIST}.${ELASTICSEARCH_NODE}`,
      ""
    );
  }

  get imagePath(): string {
    return this.configService.get<string>(`${ARTIST}.${IMAGE_PATH}`, "");
  }

  get imagePathDefaultArtist(): string {
    return this.configService.get<string>(
      `${ARTIST}.${IMAGE_PATH_DEFAULT}`,
      ""
    );
  }

  get indexName(): string {
    return this.configService.get<string>(`${ARTIST}.${INDEX_NAME}`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${ARTIST}.${MAX_SIZE}`, 0);
  }

  get servicePort(): number {
    return this.configService.get<number>(`${ARTIST}.${SERVICE_PORT}`, 0);
  }

  get serviceRetryAttempts(): number {
    return this.configService.get<number>(
      `${ARTIST}.${SERVICE_RETRY_ATTEMPTS}`,
      0
    );
  }

  get serviceRetryDelay(): number {
    return ms(
      this.configService.get<string>(`${ARTIST}.${SERVICE_RETRY_DELAY}`, "0")
    );
  }

  get serviceUrl(): string {
    return this.configService.get<string>(`${ARTIST}.${SERVICE_URL}`, "");
  }
}
