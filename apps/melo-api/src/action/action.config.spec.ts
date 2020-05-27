import config from "./action.config";

describe("ActionConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      cacheHost: undefined,
      cacheMax: undefined,
      cachePort: undefined,
      cacheStore: undefined,
      cacheTTL: undefined,
    });
  });
});
