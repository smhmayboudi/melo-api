import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class FileConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) { }

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

  get storage(): string {
    return this.configService.get<string>("file.storage", "/upload");
  }

  get accessKeyId(): string {
    return this.configService.get<string>("file.accessKeyId", "minioadmin");
  }

  get secretAccessKey(): string {
    return this.configService.get<string>("file.secretAccessKey", "minioadmin");
  }

  get endpoint(): string {
    return this.configService.get<string>("file.endpoint", "localhost:9000");
  }

  get sslEnabled(): boolean {
    return this.configService.get<boolean>("file.sslEnabled", false);
  }

  get storageMiscBucket(): string {
    return this.configService.get<string>("file.storageMiscBucket", 'misc');
  }
}
