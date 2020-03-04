import { SearchHealthIndicator } from "./search.health.indicator";

describe("SearchHealthIndicator", () => {
  it("should be defined", () => {
    expect(new SearchHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new SearchHealthIndicator().isHealthy()).toBeDefined();
  });
});
