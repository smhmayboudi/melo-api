import { AppHttpCacheInterceptor } from "./app.http-cache.interceptor";
import { ExecutionContext } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

describe("AppHttpCacheInterceptor", () => {
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({ path: "" })),
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
  it("should be defined", () => {
    expect(new AppHttpCacheInterceptor(new Map(), {})).toBeDefined();
  });

  it("trackBy should be equal to a value", () => {
    expect(
      new AppHttpCacheInterceptor(new Map(), {}).trackBy(executionContext)
    ).toEqual("");
  });
});
