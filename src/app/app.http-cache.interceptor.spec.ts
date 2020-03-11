import { AppHttpCacheInterceptor } from "./app.http-cache.interceptor";

describe("AppHttpCacheInterceptor", () => {
  // TODO: interface ?
  const executionContext: any = {
    switchToHttp: jest.fn().mockReturnThis(),
    getRequest: jest.fn(() => ({ path: "" }))
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
