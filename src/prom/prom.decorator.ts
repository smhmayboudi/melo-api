import { Inject } from "@nestjs/common";
import { beforeInstance, beforeMethod } from "kaop-ts";
import {
  getOrCreateCounter,
  getTokenCounter,
  getTokenGauge,
  getTokenHistogram,
  getTokenSummary
} from "./prom.util";

export const InjectCounter = (name: string): ParameterDecorator =>
  Inject(getTokenCounter(name));

export const InjectGauge = (name: string): ParameterDecorator =>
  Inject(getTokenGauge(name));

export const InjectHistogram = (name: string): ParameterDecorator =>
  Inject(getTokenHistogram(name));

export const InjectSummary = (name: string): ParameterDecorator =>
  Inject(getTokenSummary(name));

export const PromInstanceCounter = beforeInstance(meta => {
  const counterMetric = getOrCreateCounter({
    help: "app object instances total",
    labelNames: ["service"],
    name: "app_object_instances_total"
  });
  counterMetric.inc({ service: meta.target.constructor.name });
});

export const PromMethodCounter = beforeMethod(meta => {
  const counterMetric = getOrCreateCounter({
    help: "app method calls total",
    labelNames: ["method", "service"],
    name: "app_method_calls_total"
  });
  counterMetric.inc({
    service: meta.target.constructor.name,
    method: meta.method.name
  });
});
