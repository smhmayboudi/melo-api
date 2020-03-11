import { of, throwError } from "rxjs";
import { AppErrorInterceptor } from "./app.error.interceptor";

describe("AppErrorInterceptor", () => {
  // TODO: interface ?
  const executionContext: any = {
    switchToHttp: jest.fn().mockReturnThis(),
    getRequest: jest.fn(() => ({ user: { sub: "0" } }))
  };
  const callHandler = {
    handle: jest.fn(() => of(""))
  };
  const callHandlerException = {
    handle: jest.fn(() => throwError(""))
  };

  it("should be defined", () => {
    expect(new AppErrorInterceptor()).toBeDefined();
  });

  it("intercept should be called", () => {
    new AppErrorInterceptor()
      .intercept(executionContext, callHandler)
      .subscribe();
    expect(executionContext.switchToHttp).toHaveBeenCalled();
    expect(executionContext.getRequest).toHaveBeenCalled();
    // executionContext.switchToHttp.mockReset();
    // executionContext.getRequest.mockReset();
  });

  it("intercept should be called with exception", () => {
    new AppErrorInterceptor()
      .intercept(executionContext, callHandlerException)
      .subscribe();
    expect(executionContext.switchToHttp).toHaveBeenCalled();
    expect(executionContext.getRequest).toHaveBeenCalled();
    // executionContext.switchToHttp.mockReset();
    // executionContext.getRequest.mockReset();
  });
});
