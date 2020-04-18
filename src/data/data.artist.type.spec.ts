import { DataArtistType } from "./data.artist.type";

describe("DataArtistType", () => {
  it("should be equal to data artist type", () => {
    expect(DataArtistType).toStrictEqual({
      feat: "feat",
      prime: "prime",
    });
  });
});
