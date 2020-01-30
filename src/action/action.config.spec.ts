import config from "./action.config";

describe("ActionConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
