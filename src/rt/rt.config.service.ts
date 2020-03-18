import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { RtConfigServiceInterface } from "./rt.config.service.interface";
import ms from "ms";

@Injectable()
export class RtConfigService implements RtConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      "rt.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "rt.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "rt.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      "rt.cacheStore",
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        "rt.cacheTTL",
        ms(this.appConfigService.cacheTTL)
      )
    );
  }
}
