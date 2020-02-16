import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ms from "ms";
import { AppConfigService } from "../app/app.config.service";

@Injectable()
export class JwksConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      "jwks.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "jwks.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "jwks.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      "jwks.cacheStore",
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        "jwks.cacheTTL",
        ms(this.appConfigService.cacheTTL)
      )
    );
  }
}
