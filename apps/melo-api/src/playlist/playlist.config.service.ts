import {
  CACHE_HOST,
  CACHE_MAX,
  CACHE_PORT,
  CACHE_STORE,
  CACHE_TTL,
  IMAGE_PATH,
  IMAGE_PATH_DEFAULT_PLAYLIST,
  PLAYLIST,
} from "@melo/common";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";
import ms from "ms";

@Injectable()
export class PlaylistConfigService implements PlaylistConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      `${PLAYLIST}.${CACHE_HOST}`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${PLAYLIST}.${CACHE_MAX}`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${PLAYLIST}.${CACHE_PORT}`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${PLAYLIST}.${CACHE_STORE}`,
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${PLAYLIST}.${CACHE_TTL}`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

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
