import { Inject, Injectable, Logger } from "@nestjs/common";
import * as Sentry from "@sentry/node";
import { SENTRY_INSTANCE_TOKEN } from "./sentry.constant";
import { SentryServiceInterface } from "./sentry.service.interface";

export abstract class SentryBaseService extends Logger {}

@Injectable()
export class SentryService extends Logger implements SentryServiceInterface {
  constructor(
    @Inject(SENTRY_INSTANCE_TOKEN)
    private readonly sentry: typeof Sentry
  ) {
    super();
  }

  log(message: string, context?: string): void {
    try {
      this.sentry.captureMessage(message, Sentry.Severity.Log);
      super.log(message, context);
    } catch (error) {
      // console.error(message, error);
    }
  }

  error(message: string, trace?: string, context?: string): void {
    try {
      this.sentry.captureMessage(message, Sentry.Severity.Error);
      super.error(message, trace, context);
    } catch (error) {
      // console.error(message, error);
    }
  }

  warn(message: string, context?: string): void {
    try {
      this.sentry.captureMessage(message, Sentry.Severity.Warning);
      super.warn(message, context);
    } catch (error) {
      // console.error(message, error);
    }
  }

  debug(message: string, context?: string): void {
    try {
      this.sentry.captureMessage(message, Sentry.Severity.Debug);
      super.debug(message, context);
    } catch (error) {
      // console.error(message, error);
    }
  }

  verbose(message: string, context?: string): void {
    try {
      this.sentry.captureMessage(message, Sentry.Severity.Info);
      super.verbose(message, context);
    } catch (error) {
      // console.error(message, error);
    }
  }
}
