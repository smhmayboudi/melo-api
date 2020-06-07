import { DgraphModuleOptions, DgraphOptionsFactory } from "@melo/dgraph";

import { Injectable } from "@nestjs/common";
import { RelationConfigService } from "./relation.config.service";

@Injectable()
export class RelationDgraphOptionsFactory implements DgraphOptionsFactory {
  constructor(private readonly relationConfigService: RelationConfigService) {}

  createDgraphOptions(): Promise<DgraphModuleOptions> | DgraphModuleOptions {
    return {
      debug: this.relationConfigService.dgraphDebug,
      stubs: [
        {
          address: this.relationConfigService.dgraphAddress,
        },
      ],
    };
  }
}
