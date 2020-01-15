import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable
} from "@nestjs/common";
import { RelationConfigService } from "./relation.config.service";

@Injectable()
export class RelationHttpModuleOptionsFactory
  implements HttpModuleOptionsFactory {
  constructor(private readonly relationConfigService: RelationConfigService) {}

  createCacheOptions(): Promise<HttpModuleOptions> | HttpModuleOptions {
    return {
      timeout: this.relationConfigService.timeout
    };
  }
}
