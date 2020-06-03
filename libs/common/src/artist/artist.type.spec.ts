import { DataArtistType } from "./artist.type";

describe("ArtistType", () => {
  it("should be equal to data artist type", () => {
    expect(DataArtistType).toStrictEqual({
      feat: "feat",
      prime: "prime",
    });
  });
});
