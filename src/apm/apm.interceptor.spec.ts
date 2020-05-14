/* eslint-disable @typescript-eslint/unbound-method */

import { CallHandler, HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Test, TestingModule } from "@nestjs/testing";
import { of, throwError } from "rxjs";

import { APM_INSTANCE_TOKEN } from "./apm.constant";
import { ApmInterceptor } from "./apm.interceptor";
import { ApmService } from "./apm.service";
import { ApmServiceInterface } from "./apm.service.interface";
import { ExecutionContext } from "@nestjs/common";

describe("ApmInterceptor", () => {
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({ user: { sub: "0" } })),
    getResponse: jest.fn(),
  };
  const executionContext: ExecutionContext = {
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getClass: jest.fn(),
    getHandler: jest.fn(),
    getType: jest.fn(),
    switchToHttp: () => httpArgumentsHost,
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
  };
  const callHandler: CallHandler = {
    handle: jest.fn(() => of("")),
  };
  const callHandlerException: CallHandler = {
    handle: jest.fn(() => throwError("")),
  };

  const ampServiceMock: ApmServiceInterface = {
    addErrorFilter: jest.fn(),
    addFilter: jest.fn(),
    addLabels: jest.fn(),
    addPatch: jest.fn(),
    addSpanFilter: jest.fn(),
    addTransactionFilter: jest.fn(),
    captureError: jest.fn(),
    clearPatches: jest.fn(),
    currentSpan: null,
    currentTraceparent: null,
    currentTransaction: null,
    destroy: jest.fn(),
    endTransaction: jest.fn(),
    flush: jest.fn(),
    handleUncaughtExceptions: jest.fn(),
    isStarted: jest.fn(),
    lambda: jest.fn(),
    logger: {
      debug: (): void => undefined,
      error: (): void => undefined,
      fatal: (): void => undefined,
      info: (): void => undefined,
      trace: (): void => undefined,
      warn: (): void => undefined,
    },
    middleware: { connect: () => (): void => undefined },
    removePatch: jest.fn(),
    setCustomContext: jest.fn(),
    setFramework: jest.fn(),
    setLabel: jest.fn(),
    setTransactionName: jest.fn(),
    setUserContext: jest.fn(),
    start: jest.fn(),
    startSpan: jest.fn(),
    startTransaction: jest.fn(),
  };

  let service: ApmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApmService,
        { provide: APM_INSTANCE_TOKEN, useValue: ampServiceMock },
      ],
    }).compile();
    service = module.get<ApmService>(ApmService);
  });

  it("should be defined", () => {
    expect(new ApmInterceptor(service)).toBeDefined();
  });

  it("intercept should be called", () => {
    new ApmInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
    expect(ampServiceMock.captureError).not.toHaveBeenCalled();
  });

  it("intercept should be called with exception", () => {
    new ApmInterceptor(service)
      .intercept(executionContext, callHandlerException)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
