import config from "./playlist.config";

describe("PlaylistConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
