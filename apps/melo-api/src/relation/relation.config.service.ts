import {
  CACHE_HOST,
  CACHE_MAX,
  CACHE_PORT,
  CACHE_STORE,
  CACHE_TTL,
  RELATION,
} from "@melo/common";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { RelationConfigServiceInterface } from "./relation.config.service.interface";
import ms from "ms";

@Injectable()
export class RelationConfigService implements RelationConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      `${RELATION}.${CACHE_HOST}`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${RELATION}.${CACHE_MAX}`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${RELATION}.${CACHE_PORT}`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${RELATION}.${CACHE_STORE}`,
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${RELATION}.${CACHE_TTL}`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }
}
