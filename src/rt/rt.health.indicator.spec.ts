import { RtHealthIndicator } from "./rt.health.indicator";

describe("RtHealthIndicator", () => {
  it("should be defined", () => {
    expect(new RtHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new RtHealthIndicator().isHealthy()).toEqual({
      action: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
