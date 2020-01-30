import config from "./search.config";

describe("SearchConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
