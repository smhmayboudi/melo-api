import config from "./emotion.config";

describe("EmotionConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      elasticNode: undefined,
      index: undefined,
      resultSize: undefined,
    });
  });
});
