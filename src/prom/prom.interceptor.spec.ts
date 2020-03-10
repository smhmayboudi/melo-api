import { APP_INTERCEPTOR } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { Counter } from "prom-client";
import {
  PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL,
  PROM_MODULE_OPTIONS
} from "./prom.constant";
import { PromInterceptor } from "./prom.interceptor";
import { PromModuleOptions } from "./prom.module.interface";
import { getTokenConfiguration, getTokenCounter } from "./prom.util";

describe("PromInterceptor", () => {
  // TODO: interface ?
  const executionContext: any = {
    switchToHttp: jest.fn().mockReturnThis(),
    getRequest: jest.fn(() => ({ method: "", route: { path: "" } })),
    getResponse: jest.fn(() => 200)
  };
  const callHandler = {
    handle: jest.fn()
  };

  // TODO: interface ?
  const counterMock = {
    inc: jest.fn(() => undefined)
  };
  // TODO: interface ?
  const optionsMock = {
    ignorePaths: undefined
  };

  let counter: Counter<string>;
  let options: PromModuleOptions;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL),
          useValue: counterMock
        },
        {
          provide: getTokenConfiguration(PROM_MODULE_OPTIONS),
          useValue: optionsMock
        },
        {
          provide: APP_INTERCEPTOR,
          useValue: PromInterceptor
        }
      ]
    }).compile();
    counter = module.get<Counter<string>>(
      getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL)
    );
    options = module.get<PromModuleOptions>(
      getTokenConfiguration(PROM_MODULE_OPTIONS)
    );
  });

  it("should be defined", () => {
    expect(new PromInterceptor(counter, options)).toBeDefined();
  });

  it("intercept should be called", () => {
    new PromInterceptor(counter, options).intercept(
      executionContext,
      callHandler
    );
    expect(executionContext.switchToHttp).toHaveBeenCalled();
    expect(executionContext.getRequest).toHaveBeenCalled();
    expect(executionContext.getResponse).toHaveBeenCalled();
    expect(counterMock.inc).not.toHaveBeenCalled();
    // executionContext.switchToHttp.mockReset();
    // executionContext.getRequest.mockReset();
    // executionContext.getResponse.mockReset();
    counterMock.inc.mockReset();
  });

  describe("includes: false", () => {
    beforeEach(async () => {
      // TODO: interface ?
      const optionsMockIncludesFalse = {
        ...optionsMock,
        ignorePaths: {
          includes: () => false
        }
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL),
            useValue: counterMock
          },
          {
            provide: getTokenConfiguration(PROM_MODULE_OPTIONS),
            useValue: optionsMockIncludesFalse
          },
          {
            provide: APP_INTERCEPTOR,
            useValue: PromInterceptor
          }
        ]
      }).compile();
      counter = module.get<Counter<string>>(
        getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL)
      );
      options = module.get<PromModuleOptions>(
        getTokenConfiguration(PROM_MODULE_OPTIONS)
      );
    });

    it("intercept should be called", () => {
      callHandler.handle.mockResolvedValueOnce("next handle");
      new PromInterceptor(counter, options).intercept(
        executionContext,
        callHandler
      );
      expect(executionContext.switchToHttp).toHaveBeenCalled();
      expect(executionContext.getRequest).toHaveBeenCalled();
      expect(executionContext.getResponse).toHaveBeenCalled();
      expect(counterMock.inc).toHaveBeenCalled();
      // executionContext.switchToHttp.mockReset();
      // executionContext.getRequest.mockReset();
      // executionContext.getResponse.mockReset();
      counterMock.inc.mockReset();
    });
  });

  describe("includes: true", () => {
    beforeEach(async () => {
      // TODO: interface ?
      const optionsMockIncludesTrue = {
        ...optionsMock,
        ignorePaths: {
          includes: () => true
        }
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL),
            useValue: counterMock
          },
          {
            provide: getTokenConfiguration(PROM_MODULE_OPTIONS),
            useValue: optionsMockIncludesTrue
          },
          {
            provide: APP_INTERCEPTOR,
            useValue: PromInterceptor
          }
        ]
      }).compile();
      counter = module.get<Counter<string>>(
        getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL)
      );
      options = module.get<PromModuleOptions>(
        getTokenConfiguration(PROM_MODULE_OPTIONS)
      );
    });

    it("intercept should be called", () => {
      callHandler.handle.mockResolvedValueOnce("next handle");
      new PromInterceptor(counter, options).intercept(
        executionContext,
        callHandler
      );
      expect(executionContext.switchToHttp).toHaveBeenCalled();
      expect(executionContext.getRequest).toHaveBeenCalled();
      expect(executionContext.getResponse).toHaveBeenCalled();
      expect(counterMock.inc).not.toHaveBeenCalled();
      // executionContext.switchToHttp.mockReset();
      // executionContext.getRequest.mockReset();
      // executionContext.getResponse.mockReset();
      counterMock.inc.mockReset();
    });
  });
});
