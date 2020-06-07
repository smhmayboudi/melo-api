import config from "./playlist.config";

describe("PlaylistConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      IMAGE_PATH: undefined,
      IMAGE_PATH_DEFAULT: undefined,
      MANGOOSE_RETRY_ATTEMPTS: undefined,
      MANGOOSE_RETRY_DELAY: undefined,
      MANGOOSE_URI: undefined,
    });
  });
});
