import { Logger } from "@nestjs/common";
import util from "util";

export default {
  debug(obj: any, msg?: any, ...args: any[]): void {
    Logger.debug(util.format(obj, msg, ...args), "AppApmLogger");
  },
  error(obj: any, msg?: any, ...args: any[]): void {
    Logger.error(util.format(obj, msg, ...args), undefined, "AppApmLogger");
  },
  fatal(obj: any, msg?: any, ...args: any[]): void {
    Logger.error(util.format(obj, msg, ...args), undefined, "AppApmLogger");
  },
  info(obj: any, msg?: any, ...args: any[]): void {
    Logger.log(util.format(obj, msg, ...args), "AppApmLogger");
  },
  trace(obj: any, msg?: any, ...args: any[]): void {
    Logger.verbose(util.format(obj, msg, ...args), "AppApmLogger");
  },
  warn(obj: any, msg?: any, ...args: any[]): void {
    Logger.warn(util.format(obj, msg, ...args), "AppApmLogger");
  },
};
