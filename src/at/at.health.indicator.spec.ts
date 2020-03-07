import { AtHealthIndicator } from "./at.health.indicator";

describe("AtHealthIndicator", () => {
  it("should be defined", () => {
    expect(new AtHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new AtHealthIndicator().isHealthy()).toBeDefined();
  });
});
