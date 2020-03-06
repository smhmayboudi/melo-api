import config from "./data.config";

describe("DataConfig", () => {
  it("should be defined", () => {
    expect(config).toBeDefined();
  });

  it("registerAs should be defined", () => {
    expect(config()).toEqual({
      timeout: undefined,
      url: undefined
    });
  });
});
