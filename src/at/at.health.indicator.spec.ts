import { AtHealthIndicator } from "./at.health.indicator";

describe("AtHealthIndicator", () => {
  it("should be defined", () => {
    expect(new AtHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new AtHealthIndicator().isHealthy()).toEqual({
      at: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
