import { AuthHealthIndicator } from "./auth.health.indicator";

describe("AuthHealthIndicator", () => {
  it("should be defined", () => {
    expect(new AuthHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new AuthHealthIndicator().isHealthy()).toEqual({
      auth: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
