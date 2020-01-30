import config from "./artist.config";

describe("ArtistConfig", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
