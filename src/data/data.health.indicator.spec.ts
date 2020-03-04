import { DataHealthIndicator } from "./data.health.indicator";

describe("DataHealthIndicator", () => {
  it("should be defined", () => {
    expect(new DataHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new DataHealthIndicator().isHealthy()).toBeDefined();
  });
});
