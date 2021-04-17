import { SearchType } from "./search.type";

describe("SearchType", () => {
  it("should be equal to data search type", () => {
    expect(SearchType).toStrictEqual({
      album: "album",
      artist: "artist",
      music: "music",
      playlist: "playlist",
      podcast: "podcast",
      song: "song",
    });
  });
});
