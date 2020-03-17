import { ConfigService } from "@nestjs/config";
import { DownloadConfigServiceInterface } from "./download.config.service.interface";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class DownloadConfigService implements DownloadConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get timeout(): number {
    return ms(this.configService.get<string>("download.timeout", "0"));
  }

  get url(): string {
    return this.configService.get<string>("download.url", "");
  }
}
