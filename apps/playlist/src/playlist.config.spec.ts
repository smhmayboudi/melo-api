import config from "./playlist.config";

describe("PlaylistConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      IMAGE_PATH: undefined,
      IMAGE_PATH_DEFAULT_PLAYLIST: undefined,
    });
  });
});
