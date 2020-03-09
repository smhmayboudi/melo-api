import { ConstHealthIndicator } from "./const.health.indicator";

describe("ConstHealthIndicator", () => {
  it("should be defined", () => {
    expect(new ConstHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new ConstHealthIndicator().isHealthy()).toEqual({
      const: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
