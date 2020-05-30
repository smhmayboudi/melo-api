import {
  CACHE_HOST,
  CACHE_MAX,
  CACHE_PORT,
  CACHE_STORE,
  CACHE_TTL,
  FILE,
  S3_ACCESS_KEY_ID,
  S3_BUCKET,
  S3_ENDPOINT,
  S3_FORCE_PATH_STYLE,
  S3_SECRET_ACCESS_KEY,
  S3_SSL_ENABLED,
} from "@melo/common";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { FileConfigServiceInterface } from "./file.config.service.interface";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class FileConfigService implements FileConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      `${FILE}.${CACHE_HOST}`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${FILE}.${CACHE_MAX}`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${FILE}.${CACHE_PORT}`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${FILE}.${CACHE_STORE}`,
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${FILE}.${CACHE_TTL}`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

  get s3AccessKeyId(): string {
    return this.configService.get<string>(`${FILE}.${S3_ACCESS_KEY_ID}`, "");
  }

  get s3Bucket(): string {
    return this.configService.get<string>(`${FILE}.${S3_BUCKET}`, "");
  }

  get s3Endpoint(): string {
    return this.configService.get<string>(`${FILE}.${S3_ENDPOINT}`, "");
  }

  get s3ForcePathStyle(): boolean {
    return this.configService.get<boolean>(
      `${FILE}.${S3_FORCE_PATH_STYLE}`,
      true
    );
  }

  get s3SecretAccessKey(): string {
    return this.configService.get<string>(
      `${FILE}.${S3_SECRET_ACCESS_KEY}`,
      ""
    );
  }

  get s3SslEnabled(): boolean {
    return this.configService.get<boolean>(`${FILE}.${S3_SSL_ENABLED}`, true);
  }
}
