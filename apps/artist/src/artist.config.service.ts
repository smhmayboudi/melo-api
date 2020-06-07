import {
  ARTIST,
  IMAGE_PATH,
  IMAGE_PATH_DEFAULT,
  INDEX_NAME,
  MAX_SIZE,
} from "@melo/common";

import { ArtistConfigServiceInterface } from "./artist.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ArtistConfigService implements ArtistConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

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
}
