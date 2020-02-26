import * as Sentry from "@sentry/node";
import { Client, Options } from "@sentry/types";
import { SentryModuleOptions } from "./sentry.module.interface";

export function createSentryClient(
  options: SentryModuleOptions
): typeof Sentry {
  Sentry.init({
    dsn: options.dsn,
    debug: options.debug === true ? false : options.debug,
    environment: options.environment,
    release: options.release,
    logLevel: options.logLevel,
    integrations: [
      new Sentry.Integrations.OnUncaughtException({
        onFatalError: (err: Error): void => {
          if (err.name !== "SentryError") {
            (Sentry.getCurrentHub().getClient<Client<Options>>() as Client<
              Options
            >).captureException(err);
            process.exit(1);
          }
        }
      }),
      new Sentry.Integrations.OnUnhandledRejection()
    ]
  });
  return Sentry;
}
