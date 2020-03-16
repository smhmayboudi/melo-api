/* eslint-disable @typescript-eslint/unbound-method */

import {
  CallHandler,
  ExecutionContext,
  HttpArgumentsHost
} from "@nestjs/common/interfaces";
import { of, throwError } from "rxjs";

import { AppErrorInterceptor } from "./app.error.interceptor";

describe("AppErrorInterceptor", () => {
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest
      .fn()
      .mockImplementation(() => ({ path: "", user: { sub: "0" } })),
    getResponse: jest.fn()
  };
  const executionContext: ExecutionContext = {
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getClass: jest.fn(),
    getHandler: jest.fn(),
    getType: jest.fn(),
    switchToHttp: () => httpArgumentsHost,
    switchToRpc: jest.fn(),
    switchToWs: jest.fn()
  };
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(""))
  };
  const callHandlerException: CallHandler = {
    handle: jest.fn(() => throwError(""))
  };

  it("should be defined", () => {
    expect(new AppErrorInterceptor()).toBeDefined();
  });

  it("intercept should be called", () => {
    new AppErrorInterceptor()
      .intercept(executionContext, callHandler)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called with exception", () => {
    new AppErrorInterceptor()
      .intercept(executionContext, callHandlerException)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
