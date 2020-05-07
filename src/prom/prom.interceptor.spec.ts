/* eslint-disable @typescript-eslint/unbound-method */

import {
  CallHandler,
  ExecutionContext,
  HttpArgumentsHost,
} from "@nestjs/common/interfaces";
import {
  PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL,
  PROM_MODULE_OPTIONS,
} from "./prom.constant";
import { Test, TestingModule } from "@nestjs/testing";
import { getTokenConfiguration, getTokenCounter } from "./prom.util";

import { APP_INTERCEPTOR } from "@nestjs/core";
import { Counter } from "prom-client";
import { PromInterceptor } from "./prom.interceptor";
import { PromModuleOptions } from "./prom.module.interface";
import { of } from "rxjs";

describe("PromInterceptor", () => {
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest
      .fn()
      .mockImplementation(() => ({ method: "", route: { path: "/test" } })),
    getResponse: jest.fn().mockImplementation(() => ({ statusCode: 200 })),
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

  // TODO: interface ?
  const counterMock = {
    inc: jest.fn(() => undefined),
  };
  const optionsMock: PromModuleOptions = {};

  let counter: Counter<string>;
  let options: PromModuleOptions;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL),
          useValue: counterMock,
        },
        {
          provide: getTokenConfiguration(PROM_MODULE_OPTIONS),
          useValue: optionsMock,
        },
        {
          provide: APP_INTERCEPTOR,
          useValue: PromInterceptor,
        },
      ],
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
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
    expect(counterMock.inc).not.toHaveBeenCalled();
    counterMock.inc.mockReset();
  });

  describe("includes: false", () => {
    beforeEach(async () => {
      const optionsMockIncludesFalse: PromModuleOptions = {
        ...optionsMock,
        ignorePaths: [""],
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL),
            useValue: counterMock,
          },
          {
            provide: getTokenConfiguration(PROM_MODULE_OPTIONS),
            useValue: optionsMockIncludesFalse,
          },
          {
            provide: APP_INTERCEPTOR,
            useValue: PromInterceptor,
          },
        ],
      }).compile();
      counter = module.get<Counter<string>>(
        getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL)
      );
      options = module.get<PromModuleOptions>(
        getTokenConfiguration(PROM_MODULE_OPTIONS)
      );
    });

    it("intercept should be called 2", () => {
      new PromInterceptor(counter, options).intercept(
        executionContext,
        callHandler
      );
      expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
      expect(counterMock.inc).toHaveBeenCalled();
      counterMock.inc.mockReset();
    });
  });

  describe("includes: true", () => {
    beforeEach(async () => {
      // TODO: interface ?
      const optionsMockIncludesTrue = {
        ...optionsMock,
        ignorePaths: ["/test"],
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL),
            useValue: counterMock,
          },
          {
            provide: getTokenConfiguration(PROM_MODULE_OPTIONS),
            useValue: optionsMockIncludesTrue,
          },
          {
            provide: APP_INTERCEPTOR,
            useValue: PromInterceptor,
          },
        ],
      }).compile();
      counter = module.get<Counter<string>>(
        getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL)
      );
      options = module.get<PromModuleOptions>(
        getTokenConfiguration(PROM_MODULE_OPTIONS)
      );
    });

    it("intercept should be called 3", () => {
      new PromInterceptor(counter, options).intercept(
        executionContext,
        callHandler
      );
      expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
      expect(counterMock.inc).not.toHaveBeenCalled();
      counterMock.inc.mockReset();
    });
  });
});
