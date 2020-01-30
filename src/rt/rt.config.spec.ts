import config from "./rt.config";

describe("RtConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
