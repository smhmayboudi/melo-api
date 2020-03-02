import { createParamDecorator } from "@nestjs/common";
import { afterMethod, beforeMethod } from "kaop-ts";
import { Span } from "./apm.module.interface";
import { getOrCreateApmInstance, getTokenName } from "./apm.util";

export const ApmCurrentSpan = createParamDecorator((_data, _req) => {
  const apmInstance = getOrCreateApmInstance({});
  return apmInstance.currentSpan;
});

export const ApmCurrentTraceparent = createParamDecorator((_data, _req) => {
  const apmInstance = getOrCreateApmInstance({});
  return apmInstance.currentTraceparent;
});

export const ApmCurrentTransaction = createParamDecorator((_data, _req) => {
  const apmInstance = getOrCreateApmInstance({});
  return apmInstance.currentTransaction;
});

let spans: { name: string; span: Span }[] = [];

export const ApmAfterMethod = afterMethod(meta => {
  const tokenName = getTokenName(meta);
  spans
    .filter(value => value.name === tokenName)
    .map(value => value.span.end());
  spans = spans.filter(value => value.name !== tokenName);
});

export const ApmBeforeMethod = beforeMethod(meta => {
  const apmInstance = getOrCreateApmInstance({});
  const span = apmInstance.startSpan(
    meta.method.name,
    meta.target.constructor.name
  );
  if (span !== null) {
    spans.push({ name: getTokenName(meta), span });
  }
});
