import config from "./jwks.config";

describe("JwksConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      TYPEORM_DATABASE: undefined,
      TYPEORM_HOST: undefined,
      TYPEORM_LOGGING: undefined,
      TYPEORM_PASSWORD: undefined,
      TYPEORM_PORT: undefined,
      TYPEORM_SYNCHRONIZE: undefined,
      TYPEORM_USERNAME: undefined,
    });
  });
});
