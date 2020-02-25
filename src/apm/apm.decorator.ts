import { Inject } from "@nestjs/common";
import { APM_INSTANCE_TOKEN } from "./apm.constant";

export const InjectApm = (): ((
  target: object,
  key: string | symbol,
  index?: number | undefined
) => void) => Inject(APM_INSTANCE_TOKEN);
