import { ExecutionContext, Logger, createParamDecorator } from "@nestjs/common";
import { afterMethod, beforeMethod } from "kaop-ts";
import { getOrCreateApmInstance, getTokenName } from "./apm.util";

import { Span } from "./apm.module.interface";

export const ApmCurrentSpan = createParamDecorator(
  (_data: unknown, _context: ExecutionContext) => {
    const apmInstance = getOrCreateApmInstance({});
    return apmInstance.currentSpan;
  }
);

export const ApmCurrentTraceparent = createParamDecorator(
  (_data: unknown, _context: ExecutionContext) => {
    const apmInstance = getOrCreateApmInstance({});
    return apmInstance.currentTraceparent;
  }
);

export const ApmCurrentTransaction = createParamDecorator(
  (_data: unknown, _context: ExecutionContext) => {
    const apmInstance = getOrCreateApmInstance({});
    return apmInstance.currentTransaction;
  }
);

let spans: { name: string; span: Span }[] = [];

export const ApmAfterMethod = afterMethod((meta) => {
  if (process.env.NODE_ENV === "test") {
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
    .filter((value) => value.name === tokenName)
    .forEach((value) => value.span.end());
  spans = spans.filter((value) => value.name !== tokenName);
});

export const ApmBeforeMethod = beforeMethod((meta) => {
  if (process.env.NODE_ENV === "debug") {
    Logger.debug(
      JSON.stringify({
        args: meta.args,
        method: meta.method.name,
        target: meta.target.constructor.name,
      })
    );
  }
  if (process.env.NODE_ENV === "test") {
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
  spans = [
    ...spans,
    {
      name: getTokenName(meta.target.constructor.name, meta.method.name),
      span,
    },
  ];
});
