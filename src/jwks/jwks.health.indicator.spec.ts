import { JwksHealthIndicator } from "./jwks.health.indicator";

describe("JwksHealthIndicator", () => {
  it("should be defined", () => {
    expect(new JwksHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new JwksHealthIndicator().isHealthy()).toEqual({
      jwks: {
        status: "up"
      }
    });
  });

  it.todo("isHealthy is false");
});
