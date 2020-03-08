import config from "./data.config";

describe("DataConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      timeout: undefined,
      url: undefined
    });
  });
});
