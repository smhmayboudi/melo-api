import {
  DOWNLOAD,
  ELASTICSEARCH_NODE,
  INDEX_NAME,
  MAX_SIZE,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { DownloadConfigServiceInterface } from "./download.config.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DownloadConfigService implements DownloadConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get elasticsearchNode(): string {
    return this.configService.get<string>(
      `${DOWNLOAD}.${ELASTICSEARCH_NODE}`,
      ""
    );
  }

  get indexName(): string {
    return this.configService.get<string>(`${DOWNLOAD}.${INDEX_NAME}`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${DOWNLOAD}.${MAX_SIZE}`, 0);
  }
}
