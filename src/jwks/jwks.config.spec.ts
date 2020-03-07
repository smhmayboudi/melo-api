import config from "./jwks.config";

describe("JwksConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      cacheHost: undefined,
      cacheMax: undefined,
      cachePort: undefined,
      cacheStore: undefined,
      cacheTTL: undefined
    });
  });
});
