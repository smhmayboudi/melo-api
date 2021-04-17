import {
  CACHE_HOST,
  CACHE_MAX,
  CACHE_PORT,
  CACHE_STORE,
  CACHE_TTL,
  CONST,
} from "@melo/common";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { ConstConfigServiceInterface } from "./const.config.service.interface";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class ConstConfigService implements ConstConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      `${CONST}.${CACHE_HOST}`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${CONST}.${CACHE_MAX}`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${CONST}.${CACHE_PORT}`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${CONST}.${CACHE_STORE}`,
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${CONST}.${CACHE_TTL}`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }
}
