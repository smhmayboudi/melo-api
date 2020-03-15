/* eslint-disable @typescript-eslint/unbound-method */

import { HttpException } from "@nestjs/common";
import { ArgumentsHost, HttpArgumentsHost } from "@nestjs/common/interfaces";
import { AppHttpExceptionFilter } from "./app.http-exception.filter";

describe("HttpExceptionFilter", () => {
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest
      .fn()
      .mockImplementation(() => ({ method: "", route: { path: "" } })),
    getResponse: jest
      .fn()
      .mockImplementation(() => ({ status: () => ({ json: () => ({}) }) }))
  };
  const argumentsHost: ArgumentsHost = {
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    switchToRpc: jest.fn(),
    switchToHttp: () => httpArgumentsHost,
    switchToWs: jest.fn(),
    getType: jest.fn()
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
