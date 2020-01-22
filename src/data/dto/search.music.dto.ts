import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { SearchType } from "../type/search.type";
import { AlbumDto } from "./album.dto";
import { ArtistDto } from "./artist.dto";
import { PlaylistDto } from "./playlist.dto";
import { SongDto } from "./song.dto";

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
    description: "The type of search",
    example: SearchType.Album
  })
  @IsEnum(SearchType)
  type: SearchType;

  @ApiProperty({
    description: "The album"
  })
  @IsOptional()
  @ValidateNested()
  album?: AlbumDto;

  @ApiProperty({
    description: "The artist"
  })
  @IsOptional()
  @ValidateNested()
  artist?: ArtistDto;

  @ApiProperty({
    description: "The playlist"
  })
  @IsOptional()
  @ValidateNested()
  playlist?: PlaylistDto;

  @ApiProperty({
    description: "The position",
    example: 0
  })
  @IsNumber()
  @IsOptional()
  position?: number;

  @ApiProperty({
    description: "The song"
  })
  @IsOptional()
  @ValidateNested()
  song?: SongDto;
}
