import config from "./download.config";

describe("DownloadConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      elasticNode: undefined,
      index: undefined,
      resultSize: undefined,
    });
  });
});
