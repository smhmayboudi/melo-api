import { AppHealthIndicator } from "./app.health.indicator";

describe("AppConfig", () => {
  it("should be defined", () => {
    expect(new AppHealthIndicator()).toBeDefined();
  });
});
