import config from "./jwks.config";

describe("JwksConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
