import { SongSiteEntity } from "./song.site.entity";

export interface SongSiteEntityRepositoryInterface {
  query(query: string): Promise<SongSiteEntity[]>;
}
