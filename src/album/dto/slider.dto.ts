import { AlbumDto } from "./album.dto";
import { ImageDto } from "./image.dto";
import { SongDto } from "./song.dto";

export class SliderDto {
  constructor(album?: AlbumDto, image?: ImageDto, song?: SongDto) {
    this.album = album;
    this.image = image;
    this.song = song;
  }
  album?: AlbumDto;
  image?: ImageDto;
  song?: SongDto;
}
