import { DynamicModule, Module } from "@nestjs/common";
import {
  SentryModuleAsyncOptions,
  SentryModuleOptions
} from "./sentry.module.interface";

import { SentryCoreModule } from "./sentry-core.module";

@Module({})
export class SentryModule {
  static forRoot(options?: SentryModuleOptions): DynamicModule {
    return {
      imports: [SentryCoreModule.forRoot(options)],
      module: SentryModule
    };
  }

  static forRootAsync(options: SentryModuleAsyncOptions): DynamicModule {
    return {
      imports: [SentryCoreModule.forRootAsync(options)],
      module: SentryModule
    };
  }
}
