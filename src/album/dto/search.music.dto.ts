import { AlbumDto } from "./album.dto";
import { ArtistDto } from "./artist.dto";
import { PlaylistDto } from "./playlist.dto";
import { SearchType } from "../type/search.type";
import { SongDto } from "./song.dto";
import { ApiProperty } from "@nestjs/swagger";

export class SearchMusicDto {
  constructor(
    type: SearchType,
    album?: AlbumDto,
    artist?: ArtistDto,
    playlist?: PlaylistDto,
    position?: number,
    song?: SongDto
  ) {
    this.type = type;
    this.album = album;
    this.artist = artist;
    this.playlist = playlist;
    this.position = position;
    this.song = song;
  }

  @ApiProperty({
    description: "The type of search"
  })
  type: SearchType;

  @ApiProperty({
    description: "The album"
  })
  album?: AlbumDto;

  @ApiProperty({
    description: "The artist"
  })
  artist?: ArtistDto;

  @ApiProperty({
    description: "The playlist"
  })
  playlist?: PlaylistDto;

  @ApiProperty({
    description: "The position",
    example: 0
  })
  position?: number;

  @ApiProperty({
    description: "The song"
  })
  song?: SongDto;
}
