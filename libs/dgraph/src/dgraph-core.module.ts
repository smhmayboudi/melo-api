import {
  DGRAPH_INSTANCE_TOKEN,
  DGRAPH_MODULE_OPTIONS,
} from "./dgraph.constant";
import {
  DgraphInstance,
  DgraphModuleAsyncOptions,
  DgraphModuleOptions,
  DgraphOptionsFactory,
} from "./dgraph.module.interface";
import {
  DynamicModule,
  Global,
  Module,
  OnModuleDestroy,
  Provider,
  Type,
} from "@nestjs/common";
import { getOrCreateDgraphInstance, makeDefaultOptions } from "./dgraph.util";

import { DgraphService } from "./dgraph.service";
import { ModuleRef } from "@nestjs/core";

@Global()
@Module({
  exports: [DgraphService],
  providers: [DgraphService],
})
export class DgraphCoreModule implements OnModuleDestroy {
  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleDestroy(): void {
    const service = this.moduleRef.get<DgraphService>(DgraphService);
    service.close();
  }

  private static createAsyncOptionsProvider(
    options: DgraphModuleAsyncOptions
  ): Provider<Promise<DgraphModuleOptions> | DgraphModuleOptions> {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: DGRAPH_MODULE_OPTIONS,
        useFactory: async (...args): Promise<DgraphModuleOptions> =>
          makeDefaultOptions(
            options.useFactory && (await options.useFactory(args))
          ),
      };
    }
    const inject = [
      (options.useClass || options.useExisting) as Type<DgraphOptionsFactory>,
    ];
    return {
      inject,
      provide: DGRAPH_MODULE_OPTIONS,
      useFactory: async (
        optionsFactory: DgraphOptionsFactory
      ): Promise<DgraphModuleOptions> =>
        makeDefaultOptions(await optionsFactory.createDgraphOptions()),
    };
  }

  private static createAsyncProviders(
    options: DgraphModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<DgraphOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  static forRoot(optoins?: DgraphModuleOptions): DynamicModule {
    const opts = makeDefaultOptions(optoins);
    const dgraphInstanceProvider: Provider<DgraphInstance> = {
      provide: DGRAPH_INSTANCE_TOKEN,
      useValue: getOrCreateDgraphInstance(opts),
    };
    return {
      exports: [dgraphInstanceProvider],
      module: DgraphCoreModule,
      providers: [dgraphInstanceProvider],
    };
  }

  static forRootAsync(options: DgraphModuleAsyncOptions = {}): DynamicModule {
    const dgraphInstanceProvider: Provider<DgraphInstance> = {
      inject: [DGRAPH_MODULE_OPTIONS],
      provide: DGRAPH_INSTANCE_TOKEN,
      useFactory: (options: DgraphModuleOptions) =>
        getOrCreateDgraphInstance(options),
    };
    return {
      exports: [dgraphInstanceProvider],
      imports: options.imports,
      module: DgraphCoreModule,
      providers: [
        ...this.createAsyncProviders(options),
        dgraphInstanceProvider,
      ],
    };
  }
}
