import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as ms from "ms";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class TelegramConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      "telegram.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "telegram.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "telegram.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      "telegram.cacheStore",
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return (
      ms(
        this.configService.get<string>(
          "telegram.cacheTTL",
          ms(this.appConfigService.cacheTTL)
        )
      ) / 1000
    );
  }
}
