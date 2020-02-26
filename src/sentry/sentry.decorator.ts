import { Inject } from "@nestjs/common";
import { SENTRY_INSTANCE_TOKEN } from "./sentry.constant";

export const InjectSentry = (): ((
  target: object,
  key: string | symbol,
  index?: number | undefined
) => void) => Inject(SENTRY_INSTANCE_TOKEN);
