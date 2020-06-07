import { ArtistType } from "./artist.type";

describe("ArtistType", () => {
  it("should be equal to data artist type", () => {
    expect(ArtistType).toStrictEqual({
      feat: "feat",
      prime: "prime",
    });
  });
});
