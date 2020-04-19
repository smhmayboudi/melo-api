import config from "./file.config";

describe("FileConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      cacheHost: undefined,
      cacheMax: undefined,
      cachePort: undefined,
      cacheStore: undefined,
      cacheTTL: undefined,
      s3AccessKeyId: undefined,
      s3Bucket: undefined,
      s3Endpoint: undefined,
      s3SecretAccessKey: undefined,
      s3SslEnabled: undefined,
    });
  });
});
