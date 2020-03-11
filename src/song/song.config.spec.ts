import config from "./song.config";

describe("SongConfig", () => {
  it("should equal to an object", () => {
    expect(config()).toStrictEqual({
      cacheHost: undefined,
      cacheMax: undefined,
      cachePort: undefined,
      cacheStore: undefined,
      cacheTTL: undefined,
      sendTelegramTimeout: undefined,
      sendTelegramUrl: undefined
    });
  });
});
