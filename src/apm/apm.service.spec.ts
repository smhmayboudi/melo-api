/* eslint-disable @typescript-eslint/unbound-method */

import { Test, TestingModule } from "@nestjs/testing";
import { APM_INSTANCE_TOKEN } from "./apm.constant";
import { ApmService } from "./apm.service";
import { ApmServiceInterface } from "./apm.service.interface";

describe("ApmService", () => {
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
    expect(service).toBeDefined();
  });

  it("start should be called", () => {
    service.start();
    expect(ampServiceMock.start).toBeCalled();
  });

  it("isStarted should be called", () => {
    service.isStarted();
    expect(ampServiceMock.isStarted).toBeCalled();
  });

  it("setFramework should be called", () => {
    service.setFramework({});
    expect(ampServiceMock.setFramework).toBeCalled();
  });

  it("addPatch should be called", () => {
    service.addPatch("", "");
    expect(ampServiceMock.addPatch).toBeCalled();
  });

  it("removePatch should be called", () => {
    service.removePatch("", "");
    expect(ampServiceMock.removePatch).toBeCalled();
  });

  it("clearPatches should be called", () => {
    service.clearPatches("");
    expect(ampServiceMock.clearPatches).toBeCalled();
  });

  it("lambda should be called", () => {
    service.lambda(() => undefined);
    expect(ampServiceMock.lambda).toBeCalled();
  });

  it("handleUncaughtExceptions should be called", () => {
    service.handleUncaughtExceptions();
    expect(ampServiceMock.handleUncaughtExceptions).toBeCalled();
  });

  it("captureError should be called", () => {
    service.captureError("");
    expect(ampServiceMock.captureError).toBeCalled();
  });

  it("startTransaction should be called", () => {
    service.startTransaction();
    expect(ampServiceMock.startTransaction).toBeCalled();
  });

  it("setTransactionName should be called", () => {
    service.setTransactionName("");
    expect(ampServiceMock.setTransactionName).toBeCalled();
  });

  it("endTransaction should be called", () => {
    service.endTransaction();
    expect(ampServiceMock.endTransaction).toBeCalled();
  });

  it("startSpan should be called", () => {
    service.startSpan();
    expect(ampServiceMock.startSpan).toBeCalled();
  });

  it("setLabel should be called", () => {
    service.setLabel("", "");
    expect(ampServiceMock.setLabel).toBeCalled();
  });

  it("addLabels should be called", () => {
    service.addLabels({});
    expect(ampServiceMock.addLabels).toBeCalled();
  });

  it("setUserContext should be called", () => {
    service.setUserContext({});
    expect(ampServiceMock.setUserContext).toBeCalled();
  });

  it("setCustomContext should be called", () => {
    service.setCustomContext({});
    expect(ampServiceMock.setCustomContext).toBeCalled();
  });

  it("addFilter should be called", () => {
    service.addFilter(() => true);
    expect(ampServiceMock.addFilter).toBeCalled();
  });

  it("addErrorFilter should be called", () => {
    service.addErrorFilter(() => true);
    expect(ampServiceMock.addErrorFilter).toBeCalled();
  });

  it("addSpanFilter should be called", () => {
    service.addSpanFilter(() => true);
    expect(ampServiceMock.addSpanFilter).toBeCalled();
  });

  it("addTransactionFilter should be called", () => {
    service.addTransactionFilter(() => true);
    expect(ampServiceMock.addTransactionFilter).toBeCalled();
  });

  it("flush should be called", () => {
    service.flush();
    expect(ampServiceMock.flush).toBeCalled();
  });

  it("destroy should be called", () => {
    service.destroy();
    expect(ampServiceMock.destroy).toBeCalled();
  });
});
