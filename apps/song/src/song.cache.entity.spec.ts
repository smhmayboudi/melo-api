import { SongCacheEntity } from "./song.cache.entity";

describe("SongCacheEntity", () => {
  it("should be defined", () => {
    expect(new SongCacheEntity(0, new Date(), "", "")).toBeDefined();
  });
});
