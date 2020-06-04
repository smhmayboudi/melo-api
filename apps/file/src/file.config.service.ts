import {
  FILE,
  S3_ACCESS_KEY_ID,
  S3_BUCKET,
  S3_ENDPOINT,
  S3_FORCE_PATH_STYLE,
  S3_SECRET_ACCESS_KEY,
  S3_SSL_ENABLED,
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_LOGGING,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { FileConfigServiceInterface } from "./file.config.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FileConfigService implements FileConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

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

  get typeormDatabase(): string {
    return this.configService.get<string>(`${FILE}.${TYPEORM_DATABASE}`, "");
  }

  get typeormHost(): string {
    return this.configService.get<string>(`${FILE}.${TYPEORM_HOST}`, "");
  }

  get typeormLogging(): boolean {
    return this.configService.get<boolean>(`${FILE}.${TYPEORM_LOGGING}`, true);
  }

  get typeormPassword(): string {
    return this.configService.get<string>(`${FILE}.${TYPEORM_PASSWORD}`, "");
  }

  get typeormPort(): number {
    return this.configService.get<number>(`${FILE}.${TYPEORM_PORT}`, 0);
  }

  get typeormSynchronize(): boolean {
    return this.configService.get<boolean>(
      `${FILE}.${TYPEORM_SYNCHRONIZE}`,
      true
    );
  }

  get typeormUsername(): string {
    return this.configService.get<string>(`${FILE}.${TYPEORM_USERNAME}`, "");
  }
}
