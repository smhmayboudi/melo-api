import { ActionConfigServiceInterface } from "./action.config.service.interface";
import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class ActionConfigService implements ActionConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      "action.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "action.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "action.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      "action.cacheStore",
      this.appConfigService.cacheHost
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        "action.cacheTTL",
        ms(this.appConfigService.cacheTTL)
      )
    );
  }
}
