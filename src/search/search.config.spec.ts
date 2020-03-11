import config from "./search.config";

describe("SearchConfig", () => {
  it("should equal to an object", () => {
    expect(config()).toStrictEqual({
      cacheHost: undefined,
      cacheMax: undefined,
      cachePort: undefined,
      cacheStore: undefined,
      cacheTTL: undefined
    });
  });
});
