import config from "./file.config";

describe("FileConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      S3_ACCESS_KEY_ID: undefined,
      S3_BUCKET: undefined,
      S3_ENDPOINT: undefined,
      S3_FORCE_PATH_STYLE: undefined,
      S3_SECRET_ACCESS_KEY: undefined,
      S3_SSL_ENABLED: undefined,
      SERVICE_PORT: undefined,
      SERVICE_RETRY_ATTEMPTS: undefined,
      SERVICE_RETRY_DELAY: undefined,
      SERVICE_URL: undefined,
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
