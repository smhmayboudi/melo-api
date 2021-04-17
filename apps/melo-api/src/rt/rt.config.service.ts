import {
  CACHE_HOST,
  CACHE_MAX,
  CACHE_PORT,
  CACHE_STORE,
  CACHE_TTL,
  RT,
} from "@melo/common";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { RtConfigServiceInterface } from "./rt.config.service.interface";
import ms from "ms";

@Injectable()
export class RtConfigService implements RtConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      `${RT}.${CACHE_HOST}`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${RT}.${CACHE_MAX}`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${RT}.${CACHE_PORT}`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${RT}.${CACHE_STORE}`,
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${RT}.${CACHE_TTL}`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }
}
