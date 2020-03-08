import { RelationHealthIndicator } from "./relation.health.indicator";

describe("RelationHealthIndicator", () => {
  it("should be defined", () => {
    expect(new RelationHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new RelationHealthIndicator().isHealthy()).toEqual({
      relation: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
