import config from "./data.config";

describe("DataConfig", () => {
  it("should equal to an object", () => {
    expect(config()).toStrictEqual({
      timeout: undefined,
      url: undefined
    });
  });
});
