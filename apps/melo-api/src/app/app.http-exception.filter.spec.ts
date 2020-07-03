import { ArgumentsHost, HttpArgumentsHost } from "@nestjs/common/interfaces";

import { AppHttpExceptionFilter } from "./app.http-exception.filter";
import { HttpException } from "@nestjs/common";

describe("HttpExceptionFilter", () => {
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({
      query: {
        path: "",
      },
      raw: {
        method: "",
      },
    })),
    getResponse: jest.fn().mockImplementation(() => ({
      status: () => ({
        json: () => ({}),
      }),
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
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getResponse).toHaveBeenCalled();
  });
});
