import config from "./emotion.config";

describe("EmotionConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      ELASTICSEARCH_NODE: undefined,
      INDEX_NAME: undefined,
      MAX_SIZE: undefined,
    });
  });
});
