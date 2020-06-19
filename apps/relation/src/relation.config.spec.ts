import config from "./relation.config";

describe("RelationConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      DGRAPH_ADDRESS: undefined,
      DGRAPH_DEBUG: undefined,
      SERVICE_PORT: undefined,
      SERVICE_RETRY_ATTEMPTS: undefined,
      SERVICE_RETRY_DELAY: undefined,
      SERVICE_URL: undefined,
    });
  });
});
