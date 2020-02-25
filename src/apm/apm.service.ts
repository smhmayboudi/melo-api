import { Injectable } from "@nestjs/common";
import AwsLambda from "aws-lambda";
import Connect from "connect";
import { InjectApm } from "./apm.decorator";
import {
  Agent,
  AgentConfigOptions,
  CaptureErrorCallback,
  CaptureErrorOptions,
  FilterFn,
  Labels,
  LabelValue,
  Logger,
  ParameterizedMessageObject,
  PatchHandler,
  Span,
  SpanOptions,
  Transaction,
  TransactionOptions,
  UserObject
} from "./apm.module.interface";

@Injectable()
export class ApmService {
  constructor(
    @InjectApm()
    private readonly apm: Agent
  ) {}

  // Configuration
  start(options?: AgentConfigOptions): Agent {
    return this.apm.start(options);
  }
  isStarted(): boolean {
    return this.apm.isStarted();
  }
  setFramework(options: {
    name?: string;
    version?: string;
    overwrite?: boolean;
  }): void {
    this.apm.setFramework(options);
  }
  addPatch(
    modules: string | Array<string>,
    handler: string | PatchHandler
  ): void {
    this.apm.addPatch(modules, handler);
  }
  removePatch(
    modules: string | Array<string>,
    handler: string | PatchHandler
  ): void {
    this.apm.removePatch(modules, handler);
  }
  clearPatches(modules: string | Array<string>): void {
    this.apm.clearPatches(modules);
  }

  // Data collection hooks
  middleware: { connect(): Connect.ErrorHandleFunction } = this.apm.middleware;
  lambda(handler: AwsLambda.Handler): AwsLambda.Handler;
  lambda(type: string, handler: AwsLambda.Handler): AwsLambda.Handler;
  lambda(type, handler?): AwsLambda.Handler {
    return this.apm.lambda(type, handler);
  }
  handleUncaughtExceptions(fn?: (err: Error) => void): void {
    this.apm.handleUncaughtExceptions(fn);
  }

  // Errors
  captureError(
    err: Error | string | ParameterizedMessageObject,
    callback?: CaptureErrorCallback
  ): void;
  captureError(
    err: Error | string | ParameterizedMessageObject,
    options?: CaptureErrorOptions,
    callback?: CaptureErrorCallback
  ): void;
  captureError(err, options?, callback?): void {
    this.apm.captureError(err, options, callback);
  }

  // Distributed Tracing
  currentTraceparent: string | null = this.apm.currentTraceparent;

  // Transactions
  startTransaction(
    name?: string | null,
    options?: TransactionOptions
  ): Transaction | null;
  startTransaction(
    name: string | null,
    type: string | null,
    options?: TransactionOptions
  ): Transaction | null;
  startTransaction(
    name: string | null,
    type: string | null,
    subtype: string | null,
    options?: TransactionOptions
  ): Transaction | null;
  startTransaction(
    name: string | null,
    type: string | null,
    subtype: string | null,
    action: string | null,
    options?: TransactionOptions
  ): Transaction | null;
  startTransaction(
    name?,
    type?,
    subtype?,
    action?,
    options?
  ): Transaction | null {
    return this.apm.startTransaction(name, type, subtype, action, options);
  }
  endTransaction(result?: string | number, endTime?: number): void {
    this.apm.endTransaction(result, endTime);
  }
  currentTransaction: Transaction | null = this.apm.currentTransaction;

  // Spans
  startSpan(name?: string | null, options?: SpanOptions): Span | null;
  startSpan(
    name: string | null,
    type: string | null,
    options?: SpanOptions
  ): Span | null;
  startSpan(
    name: string | null,
    type: string | null,
    subtype: string | null,
    options?: SpanOptions
  ): Span | null;
  startSpan(
    name: string | null,
    type: string | null,
    subtype: string | null,
    action: string | null,
    options?: SpanOptions
  ): Span | null;
  startSpan(name?, type?, subtype?, action?, options?): Span | null {
    return this.apm.startSpan(name, type, subtype, action, options);
  }
  currentSpan: Span | null = this.apm.currentSpan;

  // Context
  setLabel(name: string, value: LabelValue): boolean {
    return this.apm.setLabel(name, value);
  }
  addLabels(labels: Labels): boolean {
    return this.apm.addLabels(labels);
  }
  setUserContext(user: UserObject): void {
    this.apm.setUserContext(user);
  }
  setCustomContext(custom: object): void {
    this.apm.setCustomContext(custom);
  }

  // Transport
  addFilter(fn: FilterFn): void {
    this.apm.addFilter(fn);
  }
  addErrorFilter(fn: FilterFn): void {
    this.apm.addErrorFilter(fn);
  }
  addSpanFilter(fn: FilterFn): void {
    this.apm.addSpanFilter(fn);
  }
  addTransactionFilter(fn: FilterFn): void {
    this.apm.addTransactionFilter(fn);
  }
  flush(callback?: Function): void {
    this.apm.flush(callback);
  }
  destroy(): void {
    this.apm.destroy();
  }

  // Utils
  logger: Logger = this.apm.logger;
}
