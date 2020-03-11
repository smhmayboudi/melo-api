import config from "./rt.config";

describe("RtConfig", () => {
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
