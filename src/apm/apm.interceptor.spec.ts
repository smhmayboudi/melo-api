/* eslint-disable @typescript-eslint/unbound-method */

import { ExecutionContext } from "@nestjs/common";
import { CallHandler, HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Test, TestingModule } from "@nestjs/testing";
import { of, throwError } from "rxjs";
import { APM_INSTANCE_TOKEN } from "./apm.constant";
import { ApmInterceptor } from "./apm.interceptor";
import { ApmService } from "./apm.service";
import { ApmServiceInterface } from "./apm.service.interface";

describe("ApmInterceptor", () => {
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({ user: { sub: "0" } })),
    getResponse: jest.fn()
  };
  const executionContext: ExecutionContext = {
    getClass: jest.fn(),
    getHandler: jest.fn(),
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    switchToRpc: jest.fn(),
    switchToHttp: () => httpArgumentsHost,
    switchToWs: jest.fn(),
    getType: jest.fn()
  };
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(""))
  };
  const callHandlerException: CallHandler = {
    handle: jest.fn(() => throwError(""))
  };

  const ampServiceMock: ApmServiceInterface = {
    start: jest.fn(),
    isStarted: jest.fn(),
    setFramework: jest.fn(),
    addPatch: jest.fn(),
    removePatch: jest.fn(),
    clearPatches: jest.fn(),
    middleware: { connect: () => (): void => undefined },
    lambda: jest.fn(),
    handleUncaughtExceptions: jest.fn(),
    captureError: jest.fn(),
    currentTraceparent: null,
    startTransaction: jest.fn(),
    setTransactionName: jest.fn(),
    endTransaction: jest.fn(),
    currentTransaction: null,
    startSpan: jest.fn(),
    currentSpan: null,
    setLabel: jest.fn(),
    addLabels: jest.fn(),
    setUserContext: jest.fn(),
    setCustomContext: jest.fn(),
    addFilter: jest.fn(),
    addErrorFilter: jest.fn(),
    addSpanFilter: jest.fn(),
    addTransactionFilter: jest.fn(),
    flush: jest.fn(),
    destroy: jest.fn(),
    logger: {
      fatal: (): void => undefined,
      error: (): void => undefined,
      warn: (): void => undefined,
      info: (): void => undefined,
      debug: (): void => undefined,
      trace: (): void => undefined
    }
  };

  let service: ApmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApmService,
        { provide: APM_INSTANCE_TOKEN, useValue: ampServiceMock }
      ]
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
    expect(ampServiceMock.setUserContext).toHaveBeenCalled();
    expect(ampServiceMock.captureError).not.toHaveBeenCalled();
  });

  it("intercept should be called with exception", () => {
    new ApmInterceptor(service)
      .intercept(executionContext, callHandlerException)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
    expect(ampServiceMock.setUserContext).toHaveBeenCalled();
    expect(ampServiceMock.captureError).toHaveBeenCalled();
  });
});
