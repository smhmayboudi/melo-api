import {
  IMAGE_PATH,
  IMAGE_PATH_DEFAULT,
  MONGOOSE_RETRY_ATTEMPTS,
  MONGOOSE_RETRY_DELAY,
  MONGOOSE_URI,
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

  get mongooseRetryAttempts(): number {
    return this.configService.get<number>(
      `${PLAYLIST}.${MONGOOSE_RETRY_ATTEMPTS}`,
      0
    );
  }

  get mongooseRetryDelay(): number {
    return ms(
      this.configService.get<string>(`${PLAYLIST}.${MONGOOSE_RETRY_DELAY}`, "0")
    );
  }

  get mongooseUri(): string {
    return this.configService.get<string>(`${PLAYLIST}.${MONGOOSE_URI}`, "");
  }
}
