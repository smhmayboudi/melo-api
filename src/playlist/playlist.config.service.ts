import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";
import ms from "ms";
import { template } from "lodash";

@Injectable()
export class PlaylistConfigService implements PlaylistConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      "playlist.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "playlist.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "playlist.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      "playlist.cacheStore",
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        "playlist.cacheTTL",
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

  get defaultImagePath(): string {
    return this.configService.get<string>("app.defaultImagePath", "");
  }

  imagePath(id: string): string {
    return template(this.configService.get<string>("app.imagePath", ""))({
      id
    });
  }
}
