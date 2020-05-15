import {
  DgraphModuleAsyncOptions,
  DgraphModuleOptions,
} from "./dgraph.module.interface";
import { DynamicModule, Module } from "@nestjs/common";

import { DgraphCoreModule } from "./dgraph-core.module";

@Module({})
export class DgraphModule {
  static forRoot(options?: DgraphModuleOptions): DynamicModule {
    return {
      imports: [DgraphCoreModule.forRoot(options)],
      module: DgraphModule,
    };
  }

  static forRootAsync(options: DgraphModuleAsyncOptions): DynamicModule {
    return {
      imports: [DgraphCoreModule.forRootAsync(options)],
      module: DgraphModule,
    };
  }
}
