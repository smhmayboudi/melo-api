import config from "./auth.config";

describe("AuthConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      jwtAccessTokenExpiresCount: undefined,
      jwtAccessTokenExpiresIn: undefined,
      jwtAuhSchema: undefined,
      jwtRefreshTokenExpiresIn: undefined,
      telegramBotToken: undefined,
      telegramQueryExpiration: undefined,
    });
  });
});
