import { DynamicModule, Module } from "@nestjs/common";
import { SentryCoreModule } from "./sentry-core.module";
import {
  SentryModuleAsyncOptions,
  SentryModuleOptions
} from "./sentry.module.interface";

@Module({})
export class SentryModule {
  public static forRoot(options: SentryModuleOptions): DynamicModule {
    const dynamicModule = SentryCoreModule.forRoot(options);
    return {
      exports: [dynamicModule],
      module: SentryModule,
      imports: [dynamicModule]
    };
  }

  public static forRootAsync(options: SentryModuleAsyncOptions): DynamicModule {
    const dynamicModule = SentryCoreModule.forRootAsync(options);
    return {
      exports: [dynamicModule],
      module: SentryModule,
      imports: [dynamicModule]
    };
  }
}
