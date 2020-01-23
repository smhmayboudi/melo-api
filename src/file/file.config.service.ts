import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class FileConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get accessKeyId(): string {
    return this.configService.get<string>("file.accessKeyId", "minioadmin");
  }

  get bucket(): string {
    return this.configService.get<string>("file.bucket", "misc");
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
    return this.configService.get<number>(
      "file.cacheTTL",
      this.appConfigService.cacheTTL
    );
  }

  get endpoint(): string {
    return this.configService.get<string>("file.endpoint", "127.0.0.1:9000");
  }

  get secretAccessKey(): string {
    return this.configService.get<string>("file.secretAccessKey", "minioadmin");
  }

  get sslEnabled(): boolean {
    return this.configService.get<boolean>("file.sslEnabled", false);
  }
}
