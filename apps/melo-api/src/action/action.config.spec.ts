import config from "./action.config";

describe("ActionConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      CACHE_HOST: undefined,
      CACHE_MAX: undefined,
      CACHE_PORT: undefined,
      CACHE_STORE: undefined,
      CACHE_TTL: undefined,
    });
  });
});
