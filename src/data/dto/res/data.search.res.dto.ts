import {
  IsEnum,
  IsNumberString,
  IsOptional,
  ValidateNested,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataAlbumResDto } from "./data.album.res.dto";
import { DataArtistResDto } from "./data.artist.res.dto";
import { DataPlaylistResDto } from "./data.playlist.res.dto";
import { DataSearchType } from "../../data.search.type";
import { DataSongResDto } from "./data.song.res.dto";

export class DataSearchResDto {
  constructor(
    type: DataSearchType,
    album?: DataAlbumResDto,
    artist?: DataArtistResDto,
    playlist?: DataPlaylistResDto,
    position?: number,
    song?: DataSongResDto
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
    example: DataSearchType.album,
  })
  @IsEnum(DataSearchType)
  readonly type: DataSearchType;

  @ApiProperty({
    description: "The album",
  })
  @IsOptional()
  @ValidateNested()
  readonly album?: DataAlbumResDto;

  @ApiProperty({
    description: "The artist",
  })
  @IsOptional()
  @ValidateNested()
  readonly artist?: DataArtistResDto;

  @ApiProperty({
    description: "The playlist",
  })
  @IsOptional()
  @ValidateNested()
  readonly playlist?: DataPlaylistResDto;

  @ApiProperty({
    description: "The position",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly position?: number;

  @ApiProperty({
    description: "The song",
  })
  @IsOptional()
  @ValidateNested()
  readonly song?: DataSongResDto;
}
