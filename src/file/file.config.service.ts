import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as ms from "ms";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class FileConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get accessKeyId(): string {
    return this.configService.get<string>("file.accessKeyId", "");
  }

  get bucket(): string {
    return this.configService.get<string>("file.bucket", "");
  }

  get cacheHost(): string {
    return this.configService.get<string>(
      "file.cacheHost",
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      "file.cacheMax",
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      "file.cachePort",
      this.appConfigService.cachePort
    );
  }

  get cacheTTL(): number {
    return (
      ms(
        this.configService.get<string>(
          "file.cacheTTL",
          ms(this.appConfigService.cacheTTL)
        )
      ) / 1000
    );
  }

  get endpoint(): string {
    return this.configService.get<string>("file.endpoint", "");
  }

  get secretAccessKey(): string {
    return this.configService.get<string>("file.secretAccessKey", "");
  }

  get sslEnabled(): boolean {
    return this.configService.get<boolean>("file.sslEnabled", false);
  }
}
