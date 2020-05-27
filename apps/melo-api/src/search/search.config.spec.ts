import config from "./search.config";

describe("SearchConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      cacheHost: undefined,
      cacheMax: undefined,
      cachePort: undefined,
      cacheStore: undefined,
      cacheTTL: undefined,
      elasticNode: undefined,
      indexName: undefined,
      maxSize: undefined,
      scriptScore: undefined,
    });
  });
});
