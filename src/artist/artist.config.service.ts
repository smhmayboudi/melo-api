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
    return ms(
      this.configService.get<string>(
        "artist.cacheTTL",
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

  get resultSize(): number {
    return this.configService.get<number>("data.resultSize", 0);
  }
}
