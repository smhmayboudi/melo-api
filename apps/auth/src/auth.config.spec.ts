import config from "./auth.config";

describe("AuthConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      JWT_REFRESH_TOKEN_EXPIRES_IN: undefined,
    });
  });
});
