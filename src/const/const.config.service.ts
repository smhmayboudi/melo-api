import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as ms from "ms";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class ConstConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      "const.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "const.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "const.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      "const.cacheStore",
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return (
      ms(
        this.configService.get<string>(
          "const.cacheTTL",
          ms(this.appConfigService.cacheTTL)
        )
      ) / 1000
    );
  }
}
