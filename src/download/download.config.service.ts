import { ConfigService } from "@nestjs/config";
import { DownloadConfigServiceInterface } from "./download.config.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DownloadConfigService implements DownloadConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get elasticNode(): string {
    return this.configService.get<string>("download.elasticNode", "");
  }

  get index(): string {
    return this.configService.get<string>("download.index", "");
  }

  get resultSize(): number {
    return this.configService.get<number>("download.resultSize", 0);
  }
}
