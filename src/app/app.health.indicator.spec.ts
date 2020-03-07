import { AppHealthIndicator } from "./app.health.indicator";

describe("AppConfig", () => {
  it("should be defined", () => {
    expect(new AppHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new AppHealthIndicator().isHealthy()).toEqual({
      action: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
