import apm from "elastic-apm-node";
import { Metadata } from "kaop-ts";
import { Agent, ApmModuleOptions } from "./apm.module.interface";

let apmInstance: Agent | undefined;

export function getOrCreateApmInstance(options: ApmModuleOptions): Agent {
  if (apmInstance === undefined) {
    apmInstance = (apm.start(options) as unknown) as Agent;
  }
  return apmInstance;
}

export function getTokenName(meta: Metadata<any>): string {
  return `${meta.target.constructor.name}_${meta.method.name}`;
}

export function makeDefaultOptions(
  options?: ApmModuleOptions
): ApmModuleOptions {
  return {
    ...options
  };
}
