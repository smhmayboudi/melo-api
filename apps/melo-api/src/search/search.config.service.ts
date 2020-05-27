import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { SEARCH } from "@melo/common";
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
      `${SEARCH}.cacheHost`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${SEARCH}.cacheMax`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${SEARCH}.cachePort`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${SEARCH}.cacheStore`,
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${SEARCH}.cacheTTL`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

  get elasticNode(): string {
    return this.configService.get<string>(`${SEARCH}.elasticNode`, "");
  }

  get scriptScore(): string {
    return this.configService.get<string>(`${SEARCH}.scriptScore`, "");
  }

  get indexName(): string {
    return this.configService.get<string>(`${SEARCH}.index`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${SEARCH}.maxSize`, 0);
  }

  get suggestIndex(): string {
    return this.configService.get<string>(`${SEARCH}.suggestIndex`, "");
  }
}
