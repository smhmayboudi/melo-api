import config from "./relation.config";

describe("RelationConfig", () => {
  it("should equal to an object", () => {
    expect(config()).toStrictEqual({
      timeout: undefined,
      url: undefined
    });
  });
});
