import config from "./album.config";

describe("AlbumConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
