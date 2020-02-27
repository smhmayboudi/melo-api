import apm from "elastic-apm-node";
import { Agent, ApmModuleOptions } from "./apm.module.interface";

export function createApmClient(options: ApmModuleOptions): Agent {
  return (apm.start(options) as unknown) as Agent;
}

export function makeDefaultOptions(
  options?: ApmModuleOptions
): ApmModuleOptions {
  return {
    ...options
  };
}
