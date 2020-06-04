import {
  ALBUM,
  ELASTICSEARCH_NODE,
  IMAGE_PATH,
  IMAGE_PATH_DEFAULT_ALBUM,
  INDEX_NAME,
  MAX_SIZE,
} from "@melo/common";

import { AlbumConfigServiceInterface } from "./album.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

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
    return this.configService.get<string>(
      `${ALBUM}.${IMAGE_PATH_DEFAULT_ALBUM}`,
      ""
    );
  }

  get indexName(): string {
    return this.configService.get<string>(`${ALBUM}.${INDEX_NAME}`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${ALBUM}.${MAX_SIZE}`, 0);
  }
}
