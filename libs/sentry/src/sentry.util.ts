import { Client, Options } from "@sentry/types";

import Sentry from "@sentry/node";
import { SentryModuleOptions } from "./sentry.module.interface";

let sentryInstance: typeof Sentry | undefined;

export function getOrCreateSentryInstance(
  options: SentryModuleOptions,
  isTest = false
): typeof Sentry {
  if (sentryInstance === undefined || isTest) {
    Sentry.init({
      debug: options.debug,
      dsn: options.dsn,
      environment: options.environment,
      integrations: [
        new Sentry.Integrations.OnUncaughtException({
          onFatalError: (error): void => {
            if (error.name !== "SentryError") {
              (Sentry.getCurrentHub().getClient<Client<Options>>() as Client<
                Options
              >).captureException(error);
              process.exit(1);
            }
          },
        }),
        new Sentry.Integrations.OnUnhandledRejection(),
      ],
      logLevel: options.logLevel,
      release: options.release,
    });
    sentryInstance = Sentry;
  }
  return sentryInstance;
}

export function makeDefaultOptions(
  options?: SentryModuleOptions
): SentryModuleOptions {
  return {
    ...options,
  };
}
