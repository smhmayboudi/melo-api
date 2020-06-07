import config from "./const.config";

describe("ConstConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      IMAGE_BASE_URL: undefined,
      IMAGE_ENCODE: undefined,
      IMAGE_KEY: undefined,
      IMAGE_SALT: undefined,
      IMAGE_SIGNATURE_SIZE: undefined,
      IMAGE_TYPE_SIZE: undefined,
      STATIC_IMAGE_PATHS: undefined,
    });
  });
});
