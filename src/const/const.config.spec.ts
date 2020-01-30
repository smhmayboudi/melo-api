import config from "./const.config";

describe("ConstConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
