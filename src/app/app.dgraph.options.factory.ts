import {
  DgraphModuleOptions,
  DgraphOptionsFactory,
} from "../dgraph/dgraph.module.interface";

import { AppConfigService } from "./app.config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppDgraphOptionsFactory implements DgraphOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createDgraphOptions(): Promise<DgraphModuleOptions> | DgraphModuleOptions {
    return {
      debug: this.appConfigService.dgraphDebug,
      stubs: [
        {
          address: this.appConfigService.dgraphAddress,
        },
      ],
    };
  }
}
