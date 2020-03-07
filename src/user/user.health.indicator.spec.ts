import { UserHealthIndicator } from "./user.health.indicator";

describe("UserHealthIndicator", () => {
  it("should be defined", () => {
    expect(new UserHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new UserHealthIndicator().isHealthy()).toEqual({
      action: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
