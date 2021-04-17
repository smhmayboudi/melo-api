import {
  ELASTICSEARCH_NODE,
  IMAGE_PATH,
  IMAGE_PATH_DEFAULT,
  INDEX_NAME,
  MAX_SIZE,
  MP3_ENDPOINT,
  SEND_TIMEOUT,
  SEND_URL,
  SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY,
  SERVICE_URL,
  SONG,
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_LOGGING,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { SongConfigServiceInterface } from "./song.config.service.interface";
import ms from "ms";

@Injectable()
export class SongConfigService implements SongConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get elasticsearchNode(): string {
    return this.configService.get<string>(`${SONG}.${ELASTICSEARCH_NODE}`, "");
  }

  get imagePath(): string {
    return this.configService.get<string>(`${SONG}.${IMAGE_PATH}`, "");
  }

  get imagePathDefaultSong(): string {
    return this.configService.get<string>(`${SONG}.${IMAGE_PATH_DEFAULT}`, "");
  }

  get indexName(): string {
    return this.configService.get<string>(`${SONG}.${INDEX_NAME}`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${SONG}.${MAX_SIZE}`, 0);
  }

  get mp3Endpoint(): string {
    return this.configService.get<string>(`${SONG}.${MP3_ENDPOINT}`, "");
  }
  get servicePort(): number {
    return this.configService.get<number>(`${SONG}.${SERVICE_PORT}`, 0);
  }

  get serviceRetryAttempts(): number {
    return this.configService.get<number>(
      `${SONG}.${SERVICE_RETRY_ATTEMPTS}`,
      0
    );
  }

  get serviceRetryDelay(): number {
    return ms(
      this.configService.get<string>(`${SONG}.${SERVICE_RETRY_DELAY}`, "0")
    );
  }

  get serviceUrl(): string {
    return this.configService.get<string>(`${SONG}.${SERVICE_URL}`, "");
  }

  get sendTimeout(): number {
    return this.configService.get<number>(`${SONG}.${SEND_TIMEOUT}`, 0);
  }
  get sendUrl(): string {
    return this.configService.get<string>(`${SONG}.${SEND_URL}`, "");
  }

  get typeormDatabase(): string {
    return this.configService.get<string>(`${SONG}.${TYPEORM_DATABASE}`, "");
  }

  get typeormHost(): string {
    return this.configService.get<string>(`${SONG}.${TYPEORM_HOST}`, "");
  }

  get typeormLogging(): boolean {
    return this.configService.get<boolean>(`${SONG}.${TYPEORM_LOGGING}`, true);
  }

  get typeormPassword(): string {
    return this.configService.get<string>(`${SONG}.${TYPEORM_PASSWORD}`, "");
  }

  get typeormPort(): number {
    return this.configService.get<number>(`${SONG}.${TYPEORM_PORT}`, 0);
  }

  get typeormSynchronize(): boolean {
    return this.configService.get<boolean>(
      `${SONG}.${TYPEORM_SYNCHRONIZE}`,
      false
    );
  }

  get typeormUsername(): string {
    return this.configService.get<string>(`${SONG}.${TYPEORM_USERNAME}`, "");
  }
}
