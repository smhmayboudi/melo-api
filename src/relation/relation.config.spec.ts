import config from "./relation.config";

describe("RelationConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      timeout: undefined,
      url: undefined
    });
  });
});
