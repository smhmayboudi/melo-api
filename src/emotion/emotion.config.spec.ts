import config from "./emotion.config";

describe("EmotionConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      timeout: undefined,
      url: undefined
    });
  });
});
