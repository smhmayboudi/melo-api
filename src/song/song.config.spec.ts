import config from "./song.config";

describe("SongConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
