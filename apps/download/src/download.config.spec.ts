import config from "./download.config";

describe("DownloadConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      ELASTICSEARCH_NODE: undefined,
      INDEX_NAME: undefined,
      MAX_SIZE: undefined,
    });
  });
});
