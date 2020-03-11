import { AppLoggerMiddleware } from "./app.logger.middleware";

describe("AppLoggerMiddleware", () => {
  // TODO interface ?
  const request = {
    path: "",
    user: {}
  };
  // TODO: interface ?
  const response = {};
  it("should be defined", () => {
    expect(new AppLoggerMiddleware()).toBeDefined();
  });

  it("use should be undefined", () => {
    expect(
      new AppLoggerMiddleware().use(request, response, () => ({}))
    ).toBeUndefined();
  });
});
