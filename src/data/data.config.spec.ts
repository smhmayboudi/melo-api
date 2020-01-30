import config from "./data.config";

describe("DataConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
