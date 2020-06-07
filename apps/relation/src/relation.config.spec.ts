import config from "./relation.config";

describe("RelationConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      DGRAPH_ADDRESS: undefined,
      DGRAPH_DEBUG: undefined,
    });
  });
});
