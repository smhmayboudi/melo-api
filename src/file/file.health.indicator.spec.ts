import { FileHealthIndicator } from "./file.health.indicator";

describe("FileHealthIndicator", () => {
  it("should be defined", () => {
    expect(new FileHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new FileHealthIndicator().isHealthy()).toEqual({
      action: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
