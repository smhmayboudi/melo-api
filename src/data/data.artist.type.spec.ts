import { DataArtistType } from "./data.artist.type";

describe("DataArtistType", () => {
  it("should be defined", () => {
    expect(DataArtistType).toStrictEqual({
      feat: "feat",
      prime: "prime"
    });
  });
});
