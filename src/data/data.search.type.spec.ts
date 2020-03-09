import { DataSearchType } from "./data.search.type";

describe("DataSearchType", () => {
  it("should be defined", () => {
    expect(DataSearchType).toStrictEqual({
      album: "album",
      artist: "artist",
      playlist: "playlist",
      song: "song"
    });
  });
});
