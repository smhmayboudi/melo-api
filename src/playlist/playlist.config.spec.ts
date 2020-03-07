import config from "./playlist.config";

describe("PlaylistConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      cacheHost: undefined,
      cacheMax: undefined,
      cachePort: undefined,
      cacheStore: undefined,
      cacheTTL: undefined,
      defaultImagePath: undefined,
      imagePath: undefined
    });
  });
});
