import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { SONG } from "@melo/common";
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
      `${SONG}.cacheHost`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${SONG}.cacheMax`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${SONG}.cachePort`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${SONG}.cacheStore`,
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${SONG}.cacheTTL`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

  get maxSize(): number {
    return this.configService.get<number>(`${SONG}.maxSize`, 0);
  }

  get timeout(): number {
    return ms(this.configService.get<string>(`${SONG}.timeout`, "0"));
  }

  get url(): string {
    return this.configService.get<string>(`${SONG}.timeout`, "");
  }
}
