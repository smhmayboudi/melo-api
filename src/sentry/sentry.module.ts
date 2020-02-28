import { DynamicModule, Module } from "@nestjs/common";
import { SentryCoreModule } from "./sentry-core.module";
import {
  SentryModuleAsyncOptions,
  SentryModuleOptions
} from "./sentry.module.interface";

@Module({})
export class SentryModule {
  public static forRoot(options: SentryModuleOptions): DynamicModule {
    return {
      module: SentryModule,
      imports: [SentryCoreModule.forRoot(options)]
    };
  }

  public static forRootAsync(options: SentryModuleAsyncOptions): DynamicModule {
    return {
      module: SentryModule,
      imports: [SentryCoreModule.forRootAsync(options)]
    };
  }
}
