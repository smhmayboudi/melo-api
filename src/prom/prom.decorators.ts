import { Inject } from "@nestjs/common";
import {
  getOrCreateCounter,
  getTokenCounter,
  getTokenGauge,
  getTokenHistogram,
  getTokenSummary
} from "./prom.utils";

export const InjectCounter = (
  name: string
): ((
  target: object,
  key: string | symbol,
  index?: number | undefined
) => void) => Inject(getTokenCounter(name));

export const InjectGauge = (
  name: string
): ((
  target: object,
  key: string | symbol,
  index?: number | undefined
) => void) => Inject(getTokenGauge(name));

export const InjectHistogram = (
  name: string
): ((
  target: object,
  key: string | symbol,
  index?: number | undefined
) => void) => Inject(getTokenHistogram(name));

export const InjectSummary = (
  name: string
): ((
  target: object,
  key: string | symbol,
  index?: number | undefined
) => void) => Inject(getTokenSummary(name));

export const PromMethodCounter = () => (
  target: Record<string, any>,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<Function>
): void => {
  const className = target.constructor.name;
  const counterMetric = getOrCreateCounter({
    help: `app_${className}#${propertyKey.toString()} calls total`,
    name: `app_${className}_${propertyKey.toString()}_calls_total`
  });
  const methodFunc = descriptor.value;
  descriptor.value = function(...args): any {
    counterMetric.inc(1);
    if (methodFunc !== undefined) {
      return methodFunc.apply(this, args);
    }
  };
};

export const PromInstanceCounter = <T extends { new (...args: any[]): {} }>(
  ctor: T
): any => {
  const counterMetric = getOrCreateCounter({
    help: `app_${ctor.name} object instances total`,
    name: `app_${ctor.name}_instances_total`
  });
  return class extends ctor {
    constructor(...args) {
      counterMetric.inc(1);
      super(...args);
    }
  };
};
