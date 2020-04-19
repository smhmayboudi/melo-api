/* eslint-disable @typescript-eslint/no-empty-function */

import { AppUser } from "./app.user.decorator";
import { ExecutionContext } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { ROUTE_ARGS_METADATA } from "@nestjs/common/constants";

describe("AppUser", () => {
  // TODO: interface ?
  const httpArgumentsHostPartial = {
    getNext: jest.fn(),
    getResponse: jest.fn(),
  };
  // TODO: interface ?
  const executionContextPartial = {
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getClass: jest.fn(),
    getHandler: jest.fn(),
    getType: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
  };
  it("should be defined", () => {
    expect(AppUser()).toBeDefined();
  });

  it("shoud be equal to a value data undefined", () => {
    const httpArgumentsHost: HttpArgumentsHost = {
      ...httpArgumentsHostPartial,
      getRequest: jest.fn().mockImplementation(() => ({ user: { sub: "0" } })),
    };
    const executionContext: ExecutionContext = {
      ...executionContextPartial,
      switchToHttp: () => httpArgumentsHost,
    };
    class Test {
      test(@AppUser() _sub: number): void {}
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(metadata[key].factory(undefined, executionContext)).toEqual({
      sub: "0",
    });
  });

  it("shoud throw an error with user undefined", () => {
    const httpArgumentsHost: HttpArgumentsHost = {
      ...httpArgumentsHostPartial,
      getRequest: jest.fn().mockImplementation(() => ({})),
    };
    const executionContext: ExecutionContext = {
      ...executionContextPartial,
      switchToHttp: () => httpArgumentsHost,
    };
    class Test {
      test(@AppUser("sub") _sub: number): void {}
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    return expect(() =>
      metadata[key].factory("sub", executionContext)
    ).toThrowError();
  });

  it("shoud be equal to a value", () => {
    const httpArgumentsHost: HttpArgumentsHost = {
      ...httpArgumentsHostPartial,
      getRequest: jest.fn().mockImplementation(() => ({ user: { sub: "0" } })),
    };
    const executionContext: ExecutionContext = {
      ...executionContextPartial,
      switchToHttp: () => httpArgumentsHost,
    };
    class Test {
      test(@AppUser("sub") _sub: number): void {}
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(metadata[key].factory("sub", executionContext)).toEqual("0");
  });
});
