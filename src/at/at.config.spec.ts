import config from "./at.config";

describe("AtCoonfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
