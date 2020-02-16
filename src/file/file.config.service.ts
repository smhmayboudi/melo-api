import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ms from "ms";
import { AppConfigService } from "../app/app.config.service";

@Injectable()
export class FileConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

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

  get cacheStore(): string {
    return this.configService.get<string>(
      "file.cacheStore",
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        "file.cacheTTL",
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

  get s3AccessKeyId(): string {
    return this.configService.get<string>("file.s3AccessKeyId", "");
  }

  get s3Bucket(): string {
    return this.configService.get<string>("file.s3Bucket", "");
  }

  get s3Endpoint(): string {
    return this.configService.get<string>("file.s3Endpoint", "");
  }

  get s3SecretAccessKey(): string {
    return this.configService.get<string>("file.s3SecretAccessKey", "");
  }

  get s3SslEnabled(): boolean {
    return this.configService.get<boolean>("file.s3SslEnabled", true);
  }
}
