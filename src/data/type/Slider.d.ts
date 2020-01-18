import { Album } from "./Album";
import { Image } from "./Image";
import { Song } from "./Song";

export interface Slider {
  image?: Image;
  song?: Song;
  album?: Album;
}
