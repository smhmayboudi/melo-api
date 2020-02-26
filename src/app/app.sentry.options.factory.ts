import { Injectable } from "@nestjs/common";
import {
  SentryModuleOptions,
  SentryOptionsFactory
} from "src/sentry/sentry.module.interface";
import { AppConfigService } from "./app.config.service";

@Injectable()
export class AppSentryOptionsFactory implements SentryOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createSentryOptions(): Promise<SentryModuleOptions> | SentryModuleOptions {
    return {
      debug: this.appConfigService.sentryDebug,
      dsn: this.appConfigService.sentryDsn,
      environment: this.appConfigService.sentryEnviroment,
      logLevel: this.appConfigService.sentryLogLevel,
      release: this.appConfigService.sentryRelease
    };
  }
}
