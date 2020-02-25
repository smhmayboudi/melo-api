import config from "./artist.config";

describe("ArtistConfig", () => {
  it("should be defined", () => {
    expect(config()).toBeDefined();
  });
});
