import { Test, TestingModule } from "@nestjs/testing";
import { APM_INSTANCE_TOKEN } from "./apm.constant";
import { ApmInterceptor } from "./apm.interceptor";
import { ApmService } from "./apm.service";

describe("ApmInterceptor", () => {
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
    expect(new ApmInterceptor(service)).toBeDefined();
  });
});
