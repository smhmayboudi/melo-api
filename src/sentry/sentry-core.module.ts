import { DynamicModule, Module, Provider, Type } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import * as Sentry from "@sentry/node";
import {
  SENTRY_INSTANCE_TOKEN,
  SENTRY_MODULE_OPTIONS
} from "./sentry.constant";
import { SentryInterceptor } from "./sentry.interceptor";
import {
  SentryModuleAsyncOptions,
  SentryModuleOptions,
  SentryOptionsFactory
} from "./sentry.module.interface";
import { SentryService } from "./sentry.service";
import { createSentryClient, makeDefaultOptions } from "./sentry.util";

@Module({
  exports: [SentryService],
  providers: [
    SentryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor
    }
  ]
})
export class SentryCoreModule {
  private static createAsyncOptionsProvider(
    options: SentryModuleAsyncOptions
  ): Provider<Promise<SentryModuleOptions> | SentryModuleOptions> {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: SENTRY_MODULE_OPTIONS,
        useFactory: options.useFactory
      };
    }
    const inject = [
      (options.useClass || options.useExisting) as Type<SentryOptionsFactory>
    ];
    return {
      inject,
      provide: SENTRY_MODULE_OPTIONS,
      useFactory: async (
        optionsFactory: SentryOptionsFactory
      ): Promise<SentryModuleOptions> =>
        makeDefaultOptions(await optionsFactory.createSentryOptions())
    };
  }

  private static createAsyncProviders(
    options: SentryModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<SentryOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass
      }
    ];
  }

  public static forRoot(optoins: SentryModuleOptions = {}): DynamicModule {
    const opts = makeDefaultOptions(optoins);
    const sentryInstanceProvider: Provider<typeof Sentry> = {
      provide: SENTRY_INSTANCE_TOKEN,
      useValue: createSentryClient(opts)
    };
    return {
      exports: [sentryInstanceProvider],
      module: SentryCoreModule,
      providers: [sentryInstanceProvider]
    };
  }

  public static forRootAsync(
    options: SentryModuleAsyncOptions = {}
  ): DynamicModule {
    const sentryInstanceProvider: Provider<typeof Sentry> = {
      inject: [SENTRY_MODULE_OPTIONS],
      provide: SENTRY_INSTANCE_TOKEN,
      useFactory: (options: SentryModuleOptions) => createSentryClient(options)
    };
    return {
      exports: [sentryInstanceProvider],
      imports: options.imports,
      module: SentryCoreModule,
      providers: [...this.createAsyncProviders(options), sentryInstanceProvider]
    };
  }
}
