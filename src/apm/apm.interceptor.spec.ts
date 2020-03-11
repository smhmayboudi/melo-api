import { Test, TestingModule } from "@nestjs/testing";
import { of, throwError } from "rxjs";
import { APM_INSTANCE_TOKEN } from "./apm.constant";
import { ApmInterceptor } from "./apm.interceptor";
import { ApmService } from "./apm.service";

describe("ApmInterceptor", () => {
  // TODO: interface ?
  const ampMock = {
    start: jest.fn(),
    isStarted: jest.fn(),
    setFramework: jest.fn(),
    addPatch: jest.fn(),
    removePatch: jest.fn(),
    clearPatches: jest.fn(),
    lambda: jest.fn(),
    handleUncaughtExceptions: jest.fn(),
    captureError: jest.fn(),
    startTransaction: jest.fn(),
    setTransactionName: jest.fn(),
    endTransaction: jest.fn(),
    startSpan: jest.fn(),
    setLabel: jest.fn(),
    addLabels: jest.fn(),
    setUserContext: jest.fn(),
    setCustomContext: jest.fn(),
    addFilter: jest.fn(),
    addErrorFilter: jest.fn(),
    addSpanFilter: jest.fn(),
    addTransactionFilter: jest.fn(),
    flush: jest.fn(),
    destroy: jest.fn()
  };
  // TODO: interface ?
  const executionContext: any = {
    switchToHttp: jest.fn().mockReturnThis(),
    getRequest: jest.fn(() => ({ user: { sub: "0" } }))
  };
  // TODO: interface ?
  const callHandler = {
    handle: jest.fn(() => of(""))
  };
  // TODO: interface ?
  const callHandlerException = {
    handle: jest.fn(() => throwError(""))
  };

  let service: ApmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApmService,
        { provide: APM_INSTANCE_TOKEN, useValue: ampMock }
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
    expect(executionContext.switchToHttp).toHaveBeenCalled();
    expect(executionContext.getRequest).toHaveBeenCalled();
    expect(ampMock.setUserContext).toHaveBeenCalled();
    // executionContext.switchToHttp.mockReset();
    // executionContext.getRequest.mockReset();
    // ampMock.setUserContext.mockReset();
    // ampMock.captureError.mockReset();
  });

  it("intercept should be called with exception", () => {
    new ApmInterceptor(service)
      .intercept(executionContext, callHandlerException)
      .subscribe();
    expect(executionContext.switchToHttp).toHaveBeenCalled();
    expect(executionContext.getRequest).toHaveBeenCalled();
    expect(ampMock.setUserContext).toHaveBeenCalled();
    expect(ampMock.captureError).toHaveBeenCalled();
    // executionContext.switchToHttp.mockReset();
    // executionContext.getRequest.mockReset();
    // ampMock.setUserContext.mockReset();
    // ampMock.captureError.mockReset();
  });
});
