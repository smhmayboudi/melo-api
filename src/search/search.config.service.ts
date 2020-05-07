import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { SearchConfigServiceInterface } from "./search.config.service.interface";
import ms from "ms";

@Injectable()
export class SearchConfigService implements SearchConfigServiceInterface {
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

  get cacheStore(): string {
    return this.configService.get<string>(
      "search.cacheStore",
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        "search.cacheTTL",
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

  get elasticNode(): string {
    return this.configService.get<string>("search.elasticNode", "");
  }

  get elasticScriptScore(): string {
    return this.configService.get<string>("search.elasticScriptScore", "");
  }

  get index(): string {
    return this.configService.get<string>("search.index", "");
  }

  get suggestIndex(): string {
    return this.configService.get<string>("search.suggestIndex", "");
  }
}
