import {
  IMAGE_PATH,
  IMAGE_PATH_DEFAULT_PLAYLIST,
  PLAYLIST,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";

@Injectable()
export class PlaylistConfigService implements PlaylistConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get imagePath(): string {
    return this.configService.get<string>(`${PLAYLIST}.${IMAGE_PATH}`, "");
  }

  get imagePathDefaultPlaylist(): string {
    return this.configService.get<string>(
      `${PLAYLIST}.${IMAGE_PATH_DEFAULT_PLAYLIST}`,
      ""
    );
  }
}
