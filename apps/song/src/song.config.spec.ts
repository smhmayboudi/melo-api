import config from "./song.config";

describe("SongConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      ELASTICSEARCH_NODE: undefined,
      IMAGE_BASE_URL: undefined,
      IMAGE_ENCODE: undefined,
      IMAGE_KEY: undefined,
      IMAGE_PATH: undefined,
      IMAGE_PATH_DEFAULT_ALBUM: undefined,
      IMAGE_PATH_DEFAULT_ARTIST: undefined,
      IMAGE_PATH_DEFAULT_SONG: undefined,
      IMAGE_SALT: undefined,
      IMAGE_SIGNATURE_SIZE: undefined,
      IMAGE_TYPE_SIZE: undefined,
      INDEX_NAME: undefined,
      MAX_SIZE: undefined,
      MP3_ENDPOINT: undefined,
      TYPEORM_DATABASE: undefined,
      TYPEORM_HOST: undefined,
      TYPEORM_LOGGING: undefined,
      TYPEORM_PASSWORD: undefined,
      TYPEORM_PORT: undefined,
      TYPEORM_SYNCHRONIZE: undefined,
      TYPEORM_USERNAME: undefined,
    });
  });
});
