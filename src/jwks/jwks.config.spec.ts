import config from "./jwks.config";

describe("JwksConfig", () => {
  it("should be defined", () => {
    expect(config()).toBeDefined();
  });
});
