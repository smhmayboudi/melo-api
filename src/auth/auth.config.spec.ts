import config from "./auth.config";

describe("AuthConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
