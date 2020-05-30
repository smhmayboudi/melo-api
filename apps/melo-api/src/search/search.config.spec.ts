import config from "./search.config";

describe("SearchConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      CACHE_HOST: undefined,
      CACHE_MAX: undefined,
      CACHE_PORT: undefined,
      CACHE_STORE: undefined,
      CACHE_TTL: undefined,
      ELASTICSEARCH_NODE: undefined,
      INDEX_NAME: undefined,
      MAX_SIZE: undefined,
      SCRIPT_SCORE: undefined,
    });
  });
});
