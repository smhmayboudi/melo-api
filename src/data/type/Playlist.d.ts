import { PaginationResult } from "./PaginationResult";
import { Image } from "./Image";
import { Song } from "./Song";

export interface Playlist {
  id: string;
  title: string;
  tracksCount: number;
  songs?: PaginationResult<Song>;
  image: Image;
  releaseDate: Date;
  followersCount: number;
  public: boolean;
}
