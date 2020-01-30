import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ms from "ms";
import { AppQueryStringService } from "../app.query-string.service";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class ConstConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly appQueryStringService: AppQueryStringService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      "const.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "const.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "const.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      "const.cacheStore",
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return (
      ms(
        this.configService.get<string>(
          "const.cacheTTL",
          ms(1000 * this.appConfigService.cacheTTL)
        )
      ) / 1000
    );
  }

  get staticImagePaths(): { [key: string]: string } {
    return this.appQueryStringService.parse(
      this.configService.get<string>("app.staticImagePaths", "")
    );
  }
}
