import config from "./download.config";

describe("DownloadConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      ELASTICSEARCH_NODE: undefined,
      INDEX_NAME: undefined,
      MAX_SIZE: undefined,
      SERVICE_PORT: undefined,
      SERVICE_RETRY_ATTEMPTS: undefined,
      SERVICE_RETRY_DELAY: undefined,
      SERVICE_URL: undefined,
    });
  });
});
