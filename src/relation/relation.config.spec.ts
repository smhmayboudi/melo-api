import config from "./relation.config";

describe("RelationConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
