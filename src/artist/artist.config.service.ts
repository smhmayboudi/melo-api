import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as ms from "ms";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class ArtistConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      "artist.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "artist.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "artist.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      "artist.cacheStore",
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return (
      ms(
        this.configService.get<string>(
          "artist.cacheTTL",
          ms(this.appConfigService.cacheTTL)
        )
      ) / 1000
    );
  }
}
