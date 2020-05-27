import { ConfigService } from "@nestjs/config";
import { DOWNLOAD } from "@melo/common";
import { DownloadConfigServiceInterface } from "./download.config.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DownloadConfigService implements DownloadConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get elasticNode(): string {
    return this.configService.get<string>(`${DOWNLOAD}.elasticNode`, "");
  }

  get indexName(): string {
    return this.configService.get<string>(`${DOWNLOAD}.index`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${DOWNLOAD}.maxSize`, 0);
  }
}
