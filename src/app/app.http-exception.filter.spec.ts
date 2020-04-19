/* eslint-disable @typescript-eslint/unbound-method */

import { ArgumentsHost, HttpArgumentsHost } from "@nestjs/common/interfaces";

import { AppHttpExceptionFilter } from "./app.http-exception.filter";
import { HttpException } from "@nestjs/common";

describe("HttpExceptionFilter", () => {
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest
      .fn()
      .mockImplementation(() => ({ method: "", route: { path: "" } })),
    getResponse: jest.fn().mockImplementation(() => ({
      status: (): any => ({ json: (): any => ({}) }),
    })),
  };
  const argumentsHost: ArgumentsHost = {
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getType: jest.fn(),
    switchToHttp: () => httpArgumentsHost,
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
  };

  it("should be defined", () => {
    expect(new AppHttpExceptionFilter()).toBeDefined();
  });

  it("catch should be undefined", () => {
    const httpException = new HttpException("", 500);
    expect(
      new AppHttpExceptionFilter().catch(httpException, argumentsHost)
    ).toBeUndefined();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
    expect(httpArgumentsHost.getResponse).toHaveBeenCalled();
  });
});
