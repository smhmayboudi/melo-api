import { FileHealthIndicator } from "./file.health.indicator";

describe("FileHealthIndicator", () => {
  it("should be defined", () => {
    expect(new FileHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new FileHealthIndicator().isHealthy()).toBeDefined();
  });
});
