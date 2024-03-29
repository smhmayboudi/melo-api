import { AtHealthIndicator } from "./at.health.indicator";

describe("AtHealthIndicator", () => {
  it("should be defined", () => {
    expect(new AtHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new AtHealthIndicator().isHealthy()).toEqual({
      at: {
        status: "up",
      },
    });
  });

  it.todo("isHealthy is false");
});
