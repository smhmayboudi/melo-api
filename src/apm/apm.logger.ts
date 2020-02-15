import { Logger } from "@nestjs/common";
import { ApmModule } from "./apm.module";
import * as amp from "./apm.module.interface";

export class ApmLogger implements amp.Logger {
  fatal(msg: string, ...args: any[]): void;
  fatal(obj: {}, msg?: string, ...args: any[]): void;
  fatal(obj, msg?, ...args): void {
    Logger.error(`${obj} => ${msg} => ${args}`, undefined, ApmModule.name);
  }
  error(msg: string, ...args: any[]): void;
  error(obj: {}, msg?: string, ...args: any[]): void;
  error(obj: {}, msg?: string, ...args: any[]): void {
    Logger.error(`${obj} => ${msg} => ${args}`, undefined, ApmModule.name);
  }
  warn(msg: string, ...args: any[]): void;
  warn(obj: {}, msg?: string, ...args: any[]): void;
  warn(obj: {}, msg?: string, ...args: any[]): void {
    Logger.warn(`${obj} => ${msg} => ${args}`, ApmModule.name);
  }
  info(msg: string, ...args: any[]): void;
  info(obj: {}, msg?: string, ...args: any[]): void;
  info(obj: {}, msg?: string, ...args: any[]): void {
    Logger.log(`${obj} => ${msg} => ${args}`, ApmModule.name);
  }
  debug(msg: string, ...args: any[]): void;
  debug(obj: {}, msg?: string, ...args: any[]): void;
  debug(obj: {}, msg?: string, ...args: any[]): void {
    Logger.debug(`${obj} => ${msg} => ${args}`, ApmModule.name);
  }
  trace(msg: string, ...args: any[]): void;
  trace(obj: {}, msg?: string, ...args: any[]): void;
  trace(obj: {}, msg?: string, ...args: any[]): void {
    Logger.verbose(`${obj} => ${msg} => ${args}`, ApmModule.name);
  }
}
