import { JwksHealthIndicator } from "./jwks.health.indicator";

describe("JwksHealthIndicator", () => {
  it("should be defined", () => {
    expect(new JwksHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new JwksHealthIndicator().isHealthy()).toBeDefined();
  });
});
