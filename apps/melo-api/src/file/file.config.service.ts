import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { FILE } from "@melo/common";
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
      `${FILE}.cacheHost`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${FILE}.cacheMax`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${FILE}.cachePort`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${FILE}.cacheStore`,
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${FILE}.cacheTTL`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

  get s3AccessKeyId(): string {
    return this.configService.get<string>(`${FILE}.s3AccessKeyId`, "");
  }

  get s3Bucket(): string {
    return this.configService.get<string>(`${FILE}.s3Bucket`, "");
  }

  get s3Endpoint(): string {
    return this.configService.get<string>(`${FILE}.s3Endpoint`, "");
  }

  get s3ForcePathStyle(): boolean {
    return this.configService.get<boolean>(`${FILE}.s3ForcePathStyle`, true);
  }

  get s3SecretAccessKey(): string {
    return this.configService.get<string>(`${FILE}.s3SecretAccessKey`, "");
  }

  get s3SslEnabled(): boolean {
    return this.configService.get<boolean>(`${FILE}.s3SslEnabled`, true);
  }
}
