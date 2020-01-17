import { ErrorInterceptor } from "./error.interceptor";

describe("TodoInterceptor", () => {
  it("should be defined", () => {
    expect(new ErrorInterceptor()).toBeDefined();
  });
});
