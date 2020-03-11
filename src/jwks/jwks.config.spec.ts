import config from "./jwks.config";

describe("JwksConfig", () => {
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
