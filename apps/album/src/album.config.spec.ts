import config from "./album.config";

describe("AlbumConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      ELASTICSEARCH_NODE: undefined,
      IMAGE_PATH: undefined,
      IMAGE_PATH_DEFAULT_ALBUM: undefined,
      INDEX_NAME: undefined,
      MAX_SIZE: undefined,
    });
  });
});
