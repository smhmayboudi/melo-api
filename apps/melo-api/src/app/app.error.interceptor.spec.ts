import {
  CallHandler,
  ExecutionContext,
  HttpArgumentsHost,
} from "@nestjs/common/interfaces";

import { AppErrorInterceptor } from "./app.error.interceptor";
import { of } from "rxjs";

describe("AppErrorInterceptor", () => {
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(undefined)),
  };
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({
      raw: {
        url: "",
      },
      user: {
        sub: "0",
      },
    })),
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

  it("should be defined", () => {
    expect(new AppErrorInterceptor()).toBeDefined();
  });

  it("intercept should be called", () => {
    new AppErrorInterceptor()
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it.todo("intercept should be called with exception");
});
