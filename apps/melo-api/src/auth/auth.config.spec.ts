import config from "./auth.config";

describe("AuthConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      JWT_ACCESS_TOKEN_EXPIRES_COUNT: undefined,
      JWT_ACCESS_TOKEN_EXPIRES_IN: undefined,
      JWT_AUTH_SCHEMA: undefined,
      JWT_REFRESH_TOKEN_EXPIRES_IN: undefined,
      TELEGRAM_BOT_TOKEN: undefined,
      TELEGRAM_QUERY_EXPIRATION: undefined,
    });
  });
});
