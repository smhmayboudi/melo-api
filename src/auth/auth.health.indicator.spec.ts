import { AuthHealthIndicator } from "./auth.health.indicator";

describe("AuthHealthIndicator", () => {
  it("should be defined", () => {
    expect(new AuthHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new AuthHealthIndicator().isHealthy()).toBeDefined();
  });
});
