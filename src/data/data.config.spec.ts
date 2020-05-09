import config from "./data.config";

describe("DataConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      defaultAlbumImagePath: undefined,
      defaultArtistImagePath: undefined,
      defaultSongImagePath: undefined,
      elasticNode: undefined,
      imagePath: undefined,
      index: undefined,
      mp3Endpoint: undefined,
      requestLimit: undefined,
      size: undefined,
    });
  });
});
