import { DataSearchType } from "./data.search.type";

describe("DataSearchType", () => {
  it("should equal to data search type", () => {
    expect(DataSearchType).toStrictEqual({
      album: "album",
      artist: "artist",
      playlist: "playlist",
      song: "song"
    });
  });
});
