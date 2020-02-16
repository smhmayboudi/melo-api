import { AppHttpCacheInterceptor } from "./app.http-cache.interceptor";

describe("AppHttpCacheInterceptor", () => {
  it("should be defined", () => {
    expect(new AppHttpCacheInterceptor(new Map(), {})).toBeDefined();
  });
});
