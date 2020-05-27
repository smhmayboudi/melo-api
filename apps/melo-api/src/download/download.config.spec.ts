import config from "./download.config";

describe("DownloadConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      elasticNode: undefined,
      indexName: undefined,
      maxSize: undefined,
    });
  });
});
