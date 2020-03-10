import { Test, TestingModule } from "@nestjs/testing";
import { APM_INSTANCE_TOKEN } from "./apm.constant";
import { ApmService } from "./apm.service";

describe("ApmService", () => {
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
    expect(service).toBeDefined();
  });

  it("start should be called", () => {
    service.start();
    expect(ampMock.start).toBeCalled();
  });

  it("isStarted should be called", () => {
    service.isStarted();
    expect(ampMock.isStarted).toBeCalled();
  });

  it("setFramework should be called", () => {
    service.setFramework({});
    expect(ampMock.setFramework).toBeCalled();
  });

  it("addPatch should be called", () => {
    service.addPatch("", "");
    expect(ampMock.addPatch).toBeCalled();
  });

  it("removePatch should be called", () => {
    service.removePatch("", "");
    expect(ampMock.removePatch).toBeCalled();
  });

  it("clearPatches should be called", () => {
    service.clearPatches("");
    expect(ampMock.clearPatches).toBeCalled();
  });

  it("lambda should be called", () => {
    service.lambda(() => undefined);
    expect(ampMock.lambda).toBeCalled();
  });

  it("handleUncaughtExceptions should be called", () => {
    service.handleUncaughtExceptions();
    expect(ampMock.handleUncaughtExceptions).toBeCalled();
  });

  it("captureError should be called", () => {
    service.captureError("");
    expect(ampMock.captureError).toBeCalled();
  });

  it("startTransaction should be called", () => {
    service.startTransaction();
    expect(ampMock.startTransaction).toBeCalled();
  });

  it("setTransactionName should be called", () => {
    service.setTransactionName("");
    expect(ampMock.setTransactionName).toBeCalled();
  });

  it("endTransaction should be called", () => {
    service.endTransaction();
    expect(ampMock.endTransaction).toBeCalled();
  });

  it("startSpan should be called", () => {
    service.startSpan();
    expect(ampMock.startSpan).toBeCalled();
  });

  it("setLabel should be called", () => {
    service.setLabel("", "");
    expect(ampMock.setLabel).toBeCalled();
  });

  it("addLabels should be called", () => {
    service.addLabels({});
    expect(ampMock.addLabels).toBeCalled();
  });

  it("setUserContext should be called", () => {
    service.setUserContext({});
    expect(ampMock.setUserContext).toBeCalled();
  });

  it("setCustomContext should be called", () => {
    service.setCustomContext({});
    expect(ampMock.setCustomContext).toBeCalled();
  });

  it("addFilter should be called", () => {
    service.addFilter(() => true);
    expect(ampMock.addFilter).toBeCalled();
  });

  it("addErrorFilter should be called", () => {
    service.addErrorFilter(() => true);
    expect(ampMock.addErrorFilter).toBeCalled();
  });

  it("addSpanFilter should be called", () => {
    service.addSpanFilter(() => true);
    expect(ampMock.addSpanFilter).toBeCalled();
  });

  it("addTransactionFilter should be called", () => {
    service.addTransactionFilter(() => true);
    expect(ampMock.addTransactionFilter).toBeCalled();
  });

  it("flush should be called", () => {
    service.flush();
    expect(ampMock.flush).toBeCalled();
  });

  it("destroy should be called", () => {
    service.destroy();
    expect(ampMock.destroy).toBeCalled();
  });
});
