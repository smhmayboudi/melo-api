import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class SearchConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      "search.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "search.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "search.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheTTL(): number {
    return this.configService.get<number>(
      "search.cacheTTL",
      this.appConfigService.cacheTTL
    );
  }
}