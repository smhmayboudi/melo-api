import * as Sentry from "@sentry/node";

import { Inject, Injectable, Logger } from "@nestjs/common";

import { SENTRY_INSTANCE_TOKEN } from "./sentry.constant";
import { SentryServiceInterface } from "./sentry.service.interface";

@Injectable()
export class SentryService implements SentryServiceInterface {
  private readonly logger: typeof Logger;

  constructor(
    @Inject(SENTRY_INSTANCE_TOKEN)
    private readonly sentry: typeof Sentry
  ) {
    this.logger = Logger;
  }

  log(message: string, context?: string): void {
    try {
      this.sentry.captureMessage(message, Sentry.Severity.Log);
      this.logger.log(message, context);
    } catch (error) {
      console.error(message, error);
    }
  }

  error(message: string, trace?: string, context?: string): void {
    try {
      this.sentry.captureMessage(message, Sentry.Severity.Error);
      this.logger.error(message, trace, context);
    } catch (error) {
      console.error(message, error);
    }
  }

  warn(message: string, context?: string): void {
    try {
      this.sentry.captureMessage(message, Sentry.Severity.Warning);
      this.logger.warn(message, context);
    } catch (error) {
      console.error(message, error);
    }
  }

  debug(message: string, context?: string): void {
    try {
      this.sentry.captureMessage(message, Sentry.Severity.Debug);
      this.logger.debug(message, context);
    } catch (error) {
      console.error(message, error);
    }
  }

  verbose(message: string, context?: string): void {
    try {
      this.sentry.captureMessage(message, Sentry.Severity.Info);
      this.logger.verbose(message, context);
    } catch (error) {
      console.error(message, error);
    }
  }
}
