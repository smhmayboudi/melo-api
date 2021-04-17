import { SongOrderByType } from "./song.order-by.type";

describe("SongOrderByType", () => {
  it("should be equal to data order by type", () => {
    expect(SongOrderByType).toStrictEqual({
      downloads: "downloads",
      release: "release",
    });
  });
});
