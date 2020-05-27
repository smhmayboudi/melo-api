import { RtHealthIndicator } from "./rt.health.indicator";

describe("RtHealthIndicator", () => {
  it("should be defined", () => {
    expect(new RtHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new RtHealthIndicator().isHealthy()).toEqual({
      rt: {
        status: "up",
      },
    });
  });

  it.todo("isHealthy is false");
});
