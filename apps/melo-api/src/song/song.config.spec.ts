import config from "./song.config";

describe("SongConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      cacheHost: undefined,
      cacheMax: undefined,
      cachePort: undefined,
      cacheStore: undefined,
      cacheTTL: undefined,
      maxSize: undefined,
      timeout: undefined,
      url: undefined,
    });
  });
});
