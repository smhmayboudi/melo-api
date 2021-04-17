import config from "./action.config";

describe("ActionConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      SERVICE_PORT: undefined,
      SERVICE_RETRY_ATTEMPTS: undefined,
      SERVICE_RETRY_DELAY: undefined,
      SERVICE_URL: undefined,
    });
  });
});
