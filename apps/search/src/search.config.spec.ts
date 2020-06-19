import config from "./search.config";

describe("SearchConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      ELASTICSEARCH_NODE: undefined,
      INDEX_NAME: undefined,
      MAX_SIZE: undefined,
      SCRIPT_SCORE: undefined,
      SERVICE_PORT: undefined,
      SERVICE_RETRY_ATTEMPTS: undefined,
      SERVICE_RETRY_DELAY: undefined,
      SERVICE_URL: undefined,
      SUGGEST_INDEX: undefined,
    });
  });
});
