import config from "./file.config";

describe("FileConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      CACHE_HOST: undefined,
      CACHE_MAX: undefined,
      CACHE_PORT: undefined,
      CACHE_STORE: undefined,
      CACHE_TTL: undefined,
      S3_ACCESS_KEY_ID: undefined,
      S3_BUCKET: undefined,
      S3_ENDPOINT: undefined,
      S3_FORCE_PATH_STYLE: undefined,
      S3_SECRET_ACCESS_KEY: undefined,
      S3_SSL_ENABLED: undefined,
    });
  });
});
