import { UserHealthIndicator } from "./user.health.indicator";

describe("UserHealthIndicator", () => {
  it("should be defined", () => {
    expect(new UserHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new UserHealthIndicator().isHealthy()).toBeDefined();
  });
});
