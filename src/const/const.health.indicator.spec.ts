import { ConstHealthIndicator } from "./const.health.indicator";

describe("ConstHealthIndicator", () => {
  it("should be defined", () => {
    expect(new ConstHealthIndicator()).toBeDefined();
  });
});