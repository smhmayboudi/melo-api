import { ActionHealthIndicator } from "./action.health.indicator";

describe("ActionHealthIndicator", () => {
  it("should be defined", () => {
    expect(new ActionHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new ActionHealthIndicator().isHealthy()).toBeDefined();
  });
});
