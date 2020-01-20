import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
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
    description: "The type of search"
  })
  @IsEnum(SearchType)
  type: SearchType;

  @ApiProperty({
    description: "The album"
  })
  @IsOptional()
  @Type(() => AlbumDto)
  album?: AlbumDto;

  @ApiProperty({
    description: "The artist"
  })
  @IsOptional()
  @Type(() => ArtistDto)
  artist?: ArtistDto;

  @ApiProperty({
    description: "The playlist"
  })
  @IsOptional()
  @Type(() => PlaylistDto)
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
  @Type(() => SongDto)
  song?: SongDto;
}
