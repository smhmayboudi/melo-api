import {
  ALBUM,
  CACHE_HOST,
  CACHE_MAX,
  CACHE_PORT,
  CACHE_STORE,
  CACHE_TTL,
} from "@melo/common";

import { AlbumConfigServiceInterface } from "./album.config.service.interface";
import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class AlbumConfigService implements AlbumConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      `${ALBUM}.${CACHE_HOST}`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${ALBUM}.${CACHE_MAX}`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${ALBUM}.${CACHE_PORT}`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${ALBUM}.${CACHE_STORE}`,
      this.appConfigService.cacheHost
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${ALBUM}.${CACHE_TTL}`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }
}
