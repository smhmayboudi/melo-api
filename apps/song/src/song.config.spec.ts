import config from "./song.config";

describe("SongConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      ELASTICSEARCH_NODE: undefined,
      IMAGE_PATH: undefined,
      IMAGE_PATH_DEFAULT_SONG: undefined,
      INDEX_NAME: undefined,
      MAX_SIZE: undefined,
      MP3_ENDPOINT: undefined,
      SEND_TIMEOUT: undefined,
      SEND_URL: undefined,
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
