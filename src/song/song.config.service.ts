import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { SongConfigServiceInterface } from "./song.config.service.interface";
import ms from "ms";

@Injectable()
export class SongConfigService implements SongConfigServiceInterface {
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

  get cacheStore(): string {
    return this.configService.get<string>(
      "song.cacheStore",
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        "song.cacheTTL",
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

  get resultSize(): number {
    return this.configService.get<number>("song.resultSize", 0);
  }

  get sendTelegramUrl(): string {
    return this.configService.get<string>("song.sendTelegramUrl", "");
  }

  get timeout(): number {
    return ms(this.configService.get<string>("song.sendTelegramTimeout", "0"));
  }
}
