import { ActionHealthIndicator } from "./action.health.indicator";

describe("ActionHealthIndicator", () => {
  it("should be defined", () => {
    expect(new ActionHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new ActionHealthIndicator().isHealthy()).toEqual({
      action: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
