import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { afterMethod, beforeMethod } from "kaop-ts";
import { Span } from "./apm.module.interface";
import { getOrCreateApmInstance, getTokenName } from "./apm.util";

export const ApmCurrentSpan = createParamDecorator(
  (_data: any, _context: ExecutionContext) => {
    const apmInstance = getOrCreateApmInstance({});
    return apmInstance.currentSpan;
  }
);

export const ApmCurrentTraceparent = createParamDecorator(
  (_data: any, _context: ExecutionContext) => {
    const apmInstance = getOrCreateApmInstance({});
    return apmInstance.currentTraceparent;
  }
);

export const ApmCurrentTransaction = createParamDecorator(
  (_data: any, _context: ExecutionContext) => {
    const apmInstance = getOrCreateApmInstance({});
    return apmInstance.currentTransaction;
  }
);

let spans: { name: string; span: Span }[] = [];

export const ApmAfterMethod = afterMethod(meta => {
  if (process.env.NODE_ENV === "stage") {
    return;
  }
  const apmInstance = getOrCreateApmInstance({});
  if (!apmInstance.isStarted()) {
    return;
  }
  const tokenName = getTokenName(
    meta.target.constructor.name,
    meta.method.name
  );
  spans
    .filter(value => value.name === tokenName)
    .map(value => value.span.end());
  spans = spans.filter(value => value.name !== tokenName);
});

export const ApmBeforeMethod = beforeMethod(meta => {
  if (process.env.NODE_ENV === "stage") {
    return;
  }
  const apmInstance = getOrCreateApmInstance({});
  if (!apmInstance.isStarted()) {
    return;
  }
  const span = apmInstance.startSpan(
    meta.method.name,
    meta.target.constructor.name
  );
  if (span === null) {
    return;
  }
  spans.push({
    name: getTokenName(meta.target.constructor.name, meta.method.name),
    span
  });
});
