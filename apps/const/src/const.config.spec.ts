import config from "./const.config";

describe("ConstConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      STATIC_IMAGE_PATHS: undefined,
    });
  });
});
