import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable
} from "@nestjs/common";
import { SongConfigService } from "./song.config.service";

@Injectable()
export class SongHttpOptionsFactory implements HttpModuleOptionsFactory {
  constructor(private readonly songConfigService: SongConfigService) {}

  createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions {
    return {
      timeout: this.songConfigService.timeout
    };
  }
}
