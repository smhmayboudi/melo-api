import * as Sentry from "@sentry/node";
import { Client, Options } from "@sentry/types";
import { SentryModuleOptions } from "./sentry.module.interface";

let sentryInstance: typeof Sentry | undefined;

export function getOrCreateSentryInstance(
  options: SentryModuleOptions
): typeof Sentry {
  if (sentryInstance === undefined) {
    Sentry.init({
      dsn: options.dsn,
      debug: options.debug === true ? false : options.debug,
      environment: options.environment,
      release: options.release,
      logLevel: options.logLevel,
      integrations: [
        new Sentry.Integrations.OnUncaughtException({
          onFatalError: (error): void => {
            if (error.name !== "SentryError") {
              (Sentry.getCurrentHub().getClient<Client<Options>>() as Client<
                Options
              >).captureException(error);
              process.exit(1);
            }
          }
        }),
        new Sentry.Integrations.OnUnhandledRejection()
      ]
    });
    sentryInstance = Sentry;
  }
  return sentryInstance;
}

export function makeDefaultOptions(
  options?: SentryModuleOptions
): SentryModuleOptions {
  return {
    ...options
  };
}
