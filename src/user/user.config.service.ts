import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as ms from "ms";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class UserConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      "user.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "user.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "user.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      "user.cacheStore",
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return (
      ms(
        this.configService.get<string>(
          "user.cacheTTL",
          ms(this.appConfigService.cacheTTL)
        )
      ) / 1000
    );
  }
}
