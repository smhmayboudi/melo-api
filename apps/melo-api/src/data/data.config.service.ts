import {
  DATA,
  DataImageTypeSize,
  ELASTICSEARCH_NODE,
  IMAGE_BASE_URL,
  IMAGE_ENCODE,
  IMAGE_KEY,
  IMAGE_PATH,
  IMAGE_PATH_DEFAULT_ALBUM,
  IMAGE_PATH_DEFAULT_ARTIST,
  IMAGE_PATH_DEFAULT_SONG,
  IMAGE_SALT,
  IMAGE_SIGNATURE_SIZE,
  IMAGE_TYPE_SIZE,
  INDEX_NAME,
  MAX_SIZE,
  MP3_ENDPOINT,
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_LOGGING,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { Injectable } from "@nestjs/common";
import { SignatureSize } from "imgproxy/dist/types";

@Injectable()
export class DataConfigService implements DataConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get elasticsearchNode(): string {
    return this.configService.get<string>(`${DATA}.${ELASTICSEARCH_NODE}`, "");
  }

  get imageBaseUrl(): string {
    return this.configService.get<string>(`${DATA}.${IMAGE_BASE_URL}`, "");
  }

  get imageEncode(): boolean {
    return this.configService.get<boolean>(`${DATA}.${IMAGE_ENCODE}`, true);
  }

  get imagePath(): string {
    return this.configService.get<string>(`${DATA}.${IMAGE_PATH}`, "");
  }

  get imagePathDefaultAlbum(): string {
    return this.configService.get<string>(
      `${DATA}.${IMAGE_PATH_DEFAULT_ALBUM}`,
      ""
    );
  }

  get imagePathDefaultArtist(): string {
    return this.configService.get<string>(
      `${DATA}.${IMAGE_PATH_DEFAULT_ARTIST}`,
      ""
    );
  }

  get imagePathDefaultSong(): string {
    return this.configService.get<string>(
      `${DATA}.${IMAGE_PATH_DEFAULT_SONG}`,
      ""
    );
  }

  get imageTypeSize(): DataImageTypeSize[] {
    return JSON.parse(
      this.configService.get<string>(
        `${DATA}.${IMAGE_TYPE_SIZE}`,
        '[{"height":0,"name":"","width":0}]'
      )
    ) as DataImageTypeSize[];
  }

  get imageKey(): string {
    return this.configService.get<string>(`${DATA}.${IMAGE_KEY}`, "");
  }

  get imageSalt(): string {
    return this.configService.get<string>(`${DATA}.${IMAGE_SALT}`, "");
  }

  get imageSignatureSize(): SignatureSize {
    return this.configService.get<SignatureSize>(
      `${DATA}.${IMAGE_SIGNATURE_SIZE}`,
      1
    );
  }

  get indexName(): string {
    return this.configService.get<string>(`${DATA}.${INDEX_NAME}`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${DATA}.${MAX_SIZE}`, 0);
  }

  get mp3Endpoint(): string {
    return this.configService.get<string>(`${DATA}.${MP3_ENDPOINT}`, "");
  }

  get typeormDatabase(): string {
    return this.configService.get<string>(`${DATA}.${TYPEORM_DATABASE}`, "");
  }

  get typeormHost(): string {
    return this.configService.get<string>(`${DATA}.${TYPEORM_HOST}`, "");
  }

  get typeormLogging(): boolean {
    return this.configService.get<boolean>(`${DATA}.${TYPEORM_LOGGING}`, true);
  }

  get typeormPassword(): string {
    return this.configService.get<string>(`${DATA}.${TYPEORM_PASSWORD}`, "");
  }

  get typeormPort(): number {
    return this.configService.get<number>(`${DATA}.${TYPEORM_PORT}`, 0);
  }

  get typeormSynchronize(): boolean {
    return this.configService.get<boolean>(
      `${DATA}.${TYPEORM_SYNCHRONIZE}`,
      false
    );
  }

  get typeormUsername(): string {
    return this.configService.get<string>(`${DATA}.${TYPEORM_USERNAME}`, "");
  }
}
