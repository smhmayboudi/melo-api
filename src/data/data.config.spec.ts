import config from "./data.config";

describe("DataConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      timeout: undefined,
      url: undefined,
    });
  });
});
