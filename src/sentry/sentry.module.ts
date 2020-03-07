import { DynamicModule, Module } from "@nestjs/common";
import { SentryCoreModule } from "./sentry-core.module";
import {
  SentryModuleAsyncOptions,
  SentryModuleOptions
} from "./sentry.module.interface";

@Module({})
export class SentryModule {
  static forRoot(options?: SentryModuleOptions): DynamicModule {
    return {
      module: SentryModule,
      imports: [SentryCoreModule.forRoot(options)]
    };
  }

  static forRootAsync(options: SentryModuleAsyncOptions): DynamicModule {
    return {
      module: SentryModule,
      imports: [SentryCoreModule.forRootAsync(options)]
    };
  }
}
