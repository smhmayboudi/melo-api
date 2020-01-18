import { Artist } from "./Artist";
import { Song } from "./Song";
import { PaginationResult } from "./PaginationResult";
import { Image } from "./Image";

export interface Album {
  id?: string;
  name: string;
  downloadCount?: number;
  artists?: Artist[];
  songs?: PaginationResult<Song>;
  image?: Image;
  releaseDate: Date;
  tracksCount?: number;
  tags?: string[];
}
