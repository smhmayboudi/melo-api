import { TagHealthIndicator } from "./tag.health.indicator";

describe("TagHealthIndicator", () => {
  it("should be defined", () => {
    expect(new TagHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new TagHealthIndicator().isHealthy()).toEqual({
      tag: {
        status: "up",
      },
    });
  });

  it.todo("isHealthy is false");
});
