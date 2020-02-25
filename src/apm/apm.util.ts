import apm from "elastic-apm-node";
import logger from "./apm.logger";
import { Agent, ApmModuleOptions } from "./apm.module.interface";

export function createApmClient(options: ApmModuleOptions): Agent {
  return (apm.start({ logger, ...options }) as unknown) as Agent;
}
