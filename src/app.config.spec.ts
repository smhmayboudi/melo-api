import config from "./app.config";

describe("AppConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
