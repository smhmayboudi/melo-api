import config from "./user.config";

describe("UserConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
