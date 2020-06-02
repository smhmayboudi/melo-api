import { SongCacheEntity } from "./song.cache.entity";

export interface SongCacheEntityRepositoryInterface {
  query(query: string): Promise<SongCacheEntity[]>;
}
