import { SongSiteEntityRepository } from "./song.site.entity.repository";

describe("SongSiteEntityRepository", () => {
  it("should be defined", () => {
    expect(new SongSiteEntityRepository()).toBeDefined();
  });
});
