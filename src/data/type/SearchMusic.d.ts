import { Album } from "./Album";
import { Artist } from "./Artist";
import { Playlist } from "./Playlist";
import { SearchType } from "./SearchType";
import { Song } from "./Song";

export interface SearchMusic {
  type: SearchType;
  artist?: Artist;
  song?: Song;
  album?: Album;
  playlist?: Playlist;
  position?: number;
}
