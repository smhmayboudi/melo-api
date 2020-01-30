import config from "./file.config";

describe("FileConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
