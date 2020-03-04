import { RelationHealthIndicator } from "./relation.health.indicator";

describe("RelationHealthIndicator", () => {
  it("should be defined", () => {
    expect(new RelationHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new RelationHealthIndicator().isHealthy()).toBeDefined();
  });
});
