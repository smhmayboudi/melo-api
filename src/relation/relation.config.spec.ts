import config from "./relation.config";

describe("RelationConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      timeout: undefined,
      url: undefined,
    });
  });
});
