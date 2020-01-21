import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class SongConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      "song.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "song.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "song.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheTTL(): number {
    return this.configService.get<number>(
      "song.cacheTTL",
      this.appConfigService.cacheTTL
    );
  }
}