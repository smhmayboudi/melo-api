import config from "./const.config";

describe("ConstConfig", () => {
  it("should be defined", () => {
    expect(config()).toBeDefined();
  });
});
