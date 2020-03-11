import { Logger } from "@nestjs/common";
import util from "util";

export default {
  // [propName: string]: any;
  // fatal(msg: string, ...args: any[]): void;
  // fatal(obj: {}, msg?: string | undefined, ...args: any[]): void;
  fatal(obj: any, msg?: any, ...args: any[]): void {
    Logger.error(util.format(obj, msg, ...args), undefined, "AppApmLogger");
  },
  // error(msg: string, ...args: any[]): void;
  // error(obj: {}, msg?: string | undefined, ...args: any[]): void;
  error(obj: any, msg?: any, ...args: any[]): void {
    Logger.error(util.format(obj, msg, ...args), undefined, "AppApmLogger");
  },
  // warn(msg: string, ...args: any[]): void;
  // warn(obj: {}, msg?: string | undefined, ...args: any[]): void;
  warn(obj: any, msg?: any, ...args: any[]): void {
    Logger.warn(util.format(obj, msg, ...args), "AppApmLogger");
  },
  // info(msg: string, ...args: any[]): void;
  // info(obj: {}, msg?: string | undefined, ...args: any[]): void;
  info(obj: any, msg?: any, ...args: any[]): void {
    Logger.log(util.format(obj, msg, ...args), "AppApmLogger");
  },
  // debug(msg: string, ...args: any[]): void;
  // debug(obj: {}, msg?: string | undefined, ...args: any[]): void;
  debug(obj: any, msg?: any, ...args: any[]): void {
    Logger.debug(util.format(obj, msg, ...args), "AppApmLogger");
  },
  // trace(msg: string, ...args: any[]): void;
  // trace(obj: {}, msg?: string | undefined, ...args: any[]): void;
  trace(obj: any, msg?: any, ...args: any[]): void {
    Logger.verbose(util.format(obj, msg, ...args), "AppApmLogger");
  }
};
