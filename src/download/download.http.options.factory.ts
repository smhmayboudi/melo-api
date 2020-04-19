import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from "@nestjs/common";
import { DownloadConfigService } from "./download.config.service";

@Injectable()
export class DownloadHttpOptionsFactory implements HttpModuleOptionsFactory {
  constructor(private readonly downloadConfigService: DownloadConfigService) {}

  createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions {
    return {
      timeout: this.downloadConfigService.timeout,
    };
  }
}
