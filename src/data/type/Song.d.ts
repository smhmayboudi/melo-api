import { Album } from "./Album";
import { Artist } from "./Artist";
import { Audio } from "./Audio";
import { Image } from "./Image";

export interface Song {
  id: string;
  title: string;
  artists: Artist[];
  album?: Album;
  downloadCount?: number;
  likeCount?: number;
  hasVideo?: boolean;
  lyrics?: string;
  image?: Image;
  audio: Audio;
  duration: number;
  releaseDate: Date;
  copyrighted?: boolean;
  localized: boolean;
  tags?: string[];
}
