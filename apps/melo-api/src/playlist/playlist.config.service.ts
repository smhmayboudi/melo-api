import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { PLAYLIST } from "@melo/common";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";
import ms from "ms";

@Injectable()
export class PlaylistConfigService implements PlaylistConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      `${PLAYLIST}.cacheHost`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${PLAYLIST}.cacheMax`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${PLAYLIST}.cachePort`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${PLAYLIST}.cacheStore`,
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${PLAYLIST}.cacheTTL`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

  get imagePath(): string {
    return this.configService.get<string>(`${PLAYLIST}.imagePath`, "");
  }

  get imagePathDefaultPlaylist(): string {
    return this.configService.get<string>(
      `${PLAYLIST}.imagePathDefaultPlaylist`,
      ""
    );
  }
}
