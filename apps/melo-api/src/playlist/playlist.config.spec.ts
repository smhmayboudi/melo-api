import config from "./playlist.config";

describe("PlaylistConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      CACHE_HOST: undefined,
      CACHE_MAX: undefined,
      CACHE_PORT: undefined,
      CACHE_STORE: undefined,
      CACHE_TTL: undefined,
      IMAGE_PATH: undefined,
      IMAGE_PATH_DEFAULT_PLAYLIST: undefined,
    });
  });
});
