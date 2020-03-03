import { Test, TestingModule } from "@nestjs/testing";
import { APM_INSTANCE_TOKEN } from "./apm.constant";
import { ApmService } from "./apm.service";

describe("ApmService", () => {
  let service: ApmService;

  const ampMock = jest.fn(() => ({
    start: {},
    isStarted: {},
    setFramework: {},
    addPatch: {},
    removePatch: {},
    clearPatches: {},
    lambda: {},
    handleUncaughtExceptions: {},
    captureError: {},
    startTransaction: {},
    endTransaction: {},
    setLabel: {},
    addLabels: {},
    setUserContext: {},
    setCustomContext: {},
    addFilter: {},
    addErrorFilter: {},
    addSpanFilter: {},
    addTransactionFilter: {},
    flush: {},
    destroy: {}
  }));

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

  it("isStarted should be defined", () => {
    jest.spyOn(service, "isStarted").mockImplementation(() => false);
    expect(service.isStarted()).toBeDefined();
  });

  it("setFramework should be defined", () => {
    jest.spyOn(service, "setFramework").mockImplementation(() => false);
    expect(service.setFramework({})).toBeDefined();
  });

  it("addPatch should be defined", () => {
    jest.spyOn(service, "addPatch").mockImplementation(() => false);
    expect(service.addPatch("", "")).toBeDefined();
  });

  it("removePatch should be defined", () => {
    jest.spyOn(service, "removePatch").mockImplementation(() => false);
    expect(service.removePatch("", "")).toBeDefined();
  });

  it("clearPatches should be defined", () => {
    jest.spyOn(service, "clearPatches").mockImplementation(() => false);
    expect(service.clearPatches("")).toBeDefined();
  });
});
