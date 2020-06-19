import config from "./playlist.config";

describe("PlaylistConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      IMAGE_PATH: undefined,
      IMAGE_PATH_DEFAULT: undefined,
      MONGOOSE_RETRY_ATTEMPTS: undefined,
      MONGOOSE_RETRY_DELAY: undefined,
      MONGOOSE_URI: undefined,
      SERVICE_PORT: undefined,
      SERVICE_RETRY_ATTEMPTS: undefined,
      SERVICE_RETRY_DELAY: undefined,
      SERVICE_URL: undefined,
    });
  });
});
