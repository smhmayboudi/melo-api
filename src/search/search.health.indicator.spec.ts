import { SearchHealthIndicator } from "./search.health.indicator";

describe("SearchHealthIndicator", () => {
  it("should be defined", () => {
    expect(new SearchHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new SearchHealthIndicator().isHealthy()).toEqual({
      search: {
        status: "up"
      }
    });
  });

  it.todo("isHealthy is false");
});
