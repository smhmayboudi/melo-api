import { Logger } from "@nestjs/common";
import util from "util";

export default {
  debug(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.debug(util.format(obj, msg, ...args), "AppApmLogger");
  },
  error(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.error(util.format(obj, msg, ...args), undefined, "AppApmLogger");
  },
  fatal(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.error(util.format(obj, msg, ...args), undefined, "AppApmLogger");
  },
  info(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.log(util.format(obj, msg, ...args), "AppApmLogger");
  },
  trace(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.verbose(util.format(obj, msg, ...args), "AppApmLogger");
  },
  warn(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.warn(util.format(obj, msg, ...args), "AppApmLogger");
  },
};
