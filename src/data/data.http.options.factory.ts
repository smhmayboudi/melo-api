import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable
} from "@nestjs/common";
import { DataConfigService } from "./data.config.service";

@Injectable()
export class DataHttpModuleOptionsFactory implements HttpModuleOptionsFactory {
  constructor(private readonly dataConfigService: DataConfigService) {}

  createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions {
    return {
      timeout: this.dataConfigService.timeout
    };
  }
}
