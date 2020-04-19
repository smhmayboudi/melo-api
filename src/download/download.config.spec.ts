import config from "./download.config";

describe("DownloadConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      timeout: undefined,
      url: undefined,
    });
  });
});
