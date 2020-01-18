import { Album } from "./Album";
import { ArtistType } from "./ArtistType";
import { Image } from "./Image";
import { PaginationResult } from "./PaginationResult";
import { Song } from "./Song";

export interface Artist {
  id: string;
  albums?: PaginationResult<Album>;
  songs?: PaginationResult<Song>;
  followersCount: number;
  fullName?: string;
  image?: Image;
  sumSongsDownloadsCount?: number;
  type: ArtistType;
  tags?: string[];
}
