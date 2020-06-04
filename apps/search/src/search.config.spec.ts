import config from "./search.config";

describe("SearchConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      ELASTICSEARCH_NODE: undefined,
      INDEX_NAME: undefined,
      MAX_SIZE: undefined,
      SCRIPT_SCORE: undefined,
    });
  });
});
