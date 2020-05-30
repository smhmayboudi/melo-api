import config from "./song.config";

describe("SongConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      CACHE_HOST: undefined,
      CACHE_MAX: undefined,
      CACHE_PORT: undefined,
      CACHE_STORE: undefined,
      CACHE_TTL: undefined,
      MAX_SIZE: undefined,
      SEND_TIMEOUT: undefined,
      SEND_URL: undefined,
    });
  });
});
