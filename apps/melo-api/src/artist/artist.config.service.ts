import {
  ARTIST,
  CACHE_HOST,
  CACHE_MAX,
  CACHE_PORT,
  CACHE_STORE,
  CACHE_TTL,
} from "@melo/common";

import { AppConfigService } from "../app/app.config.service";
import { ArtistConfigServiceInterface } from "./artist.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class ArtistConfigService implements ArtistConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      `${ARTIST}.${CACHE_HOST}`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${ARTIST}.${CACHE_MAX}`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${ARTIST}.${CACHE_PORT}`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${ARTIST}.${CACHE_STORE}`,
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${ARTIST}.${CACHE_TTL}`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }
}
