import { COMMON, COMMON_LOGGER } from "@melo/common";

import { Logger } from "@nestjs/common";
import util from "util";

const CommonLogger = {
  debug(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.debug(util.format(obj, msg, ...args), COMMON_LOGGER);
  },
  error(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.error(util.format(obj, msg, ...args), COMMON, COMMON_LOGGER);
  },
  fatal(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.error(util.format(obj, msg, ...args), COMMON, COMMON_LOGGER);
  },
  info(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.log(util.format(obj, msg, ...args), COMMON_LOGGER);
  },
  trace(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.verbose(util.format(obj, msg, ...args), COMMON_LOGGER);
  },
  warn(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.warn(util.format(obj, msg, ...args), COMMON_LOGGER);
  },
};

export { CommonLogger };
