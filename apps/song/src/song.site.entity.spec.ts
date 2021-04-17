import { SongSiteEntity } from "./song.site.entity";

describe("SongSiteEntity", () => {
  it("should be defined", () => {
    expect(new SongSiteEntity(new Date(), 0)).toBeDefined();
  });
});
