import {
  IMAGE_PATH,
  IMAGE_PATH_DEFAULT,
  MANGOOSE_RETRY_ATTEMPTS,
  MANGOOSE_RETRY_DELAY,
  MANGOOSE_URI,
  PLAYLIST,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";
import ms from "ms";

@Injectable()
export class PlaylistConfigService implements PlaylistConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get imagePath(): string {
    return this.configService.get<string>(`${PLAYLIST}.${IMAGE_PATH}`, "");
  }

  get imagePathDefaultPlaylist(): string {
    return this.configService.get<string>(
      `${PLAYLIST}.${IMAGE_PATH_DEFAULT}`,
      ""
    );
  }

  get mangooseRetryAttempts(): number {
    return this.configService.get<number>(
      `${PLAYLIST}.${MANGOOSE_RETRY_ATTEMPTS}`,
      0
    );
  }

  get mangooseRetryDelay(): number {
    return ms(
      this.configService.get<string>(`${PLAYLIST}.${MANGOOSE_RETRY_DELAY}`, "0")
    );
  }

  get mangooseUri(): string {
    return this.configService.get<string>(`${PLAYLIST}.${MANGOOSE_URI}`, "");
  }
}
