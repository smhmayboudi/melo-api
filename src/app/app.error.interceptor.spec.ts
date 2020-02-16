import { AppErrorInterceptor } from "./app.error.interceptor";

describe("AppErrorInterceptor", () => {
  it("should be defined", () => {
    expect(new AppErrorInterceptor()).toBeDefined();
  });
});
