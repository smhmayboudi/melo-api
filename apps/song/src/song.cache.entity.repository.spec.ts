import { SongCacheEntityRepository } from "./song.cache.entity.repository";

describe("SongCacheEntityRepository", () => {
  it("should be defined", () => {
    expect(new SongCacheEntityRepository()).toBeDefined();
  });
});
