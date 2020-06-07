import config from "./artist.config";

describe("ArtistConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      IMAGE_PATH: undefined,
      IMAGE_PATH_DEFAULT: undefined,
      INDEX_NAME: undefined,
      MAX_SIZE: undefined,
    });
  });
});
