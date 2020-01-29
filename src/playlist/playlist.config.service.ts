import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ms from "ms";
import { AppConfigService } from "../app.config.service";
import { template } from "lodash";

@Injectable()
export class PlaylistConfigService {
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
    return (
      ms(
        this.configService.get<string>(
          "playlist.cacheTTL",
          ms(1000 * this.appConfigService.cacheTTL)
        )
      ) / 1000
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
