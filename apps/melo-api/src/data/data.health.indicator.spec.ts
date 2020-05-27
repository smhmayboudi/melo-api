import { DataHealthIndicator } from "./data.health.indicator";

describe("DataHealthIndicator", () => {
  it("should be defined", () => {
    expect(new DataHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new DataHealthIndicator().isHealthy()).toEqual({
      data: {
        status: "up",
      },
    });
  });

  it.todo("isHealthy is false");
});
