import { RtHealthIndicator } from "./rt.health.indicator";

describe("RtHealthIndicator", () => {
  it("should be defined", () => {
    expect(new RtHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new RtHealthIndicator().isHealthy()).toBeDefined();
  });
});
