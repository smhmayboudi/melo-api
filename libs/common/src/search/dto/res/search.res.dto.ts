import {
  IsEnum,
  IsNumberString,
  IsOptional,
  ValidateNested,
} from "class-validator";

import { AlbumResDto } from "../../../album/dto/res/album.res.dto";
import { ApiProperty } from "@nestjs/swagger";
import { ArtistResDto } from "../../../artist/dto/res/artist.res.dto";
import { DataSearchType } from "../../../data/data.search.type";
import { PlaylistResDto } from "../../../playlist/dto/res/playlist.res.dto";
import { SongResDto } from "../../../song/dto/res/song.res.dto";
import { Type } from "class-transformer";

export class SearchResDto {
  constructor(
    type: DataSearchType,
    album?: AlbumResDto,
    artist?: ArtistResDto,
    playlist?: PlaylistResDto,
    position?: number,
    song?: SongResDto
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
  @Type(() => AlbumResDto)
  @ValidateNested()
  readonly album?: AlbumResDto;

  @ApiProperty({
    description: "The artist",
  })
  @IsOptional()
  @Type(() => ArtistResDto)
  @ValidateNested()
  readonly artist?: ArtistResDto;

  @ApiProperty({
    description: "The playlist",
  })
  @IsOptional()
  @Type(() => PlaylistResDto)
  @ValidateNested()
  readonly playlist?: PlaylistResDto;

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
  @Type(() => SongResDto)
  @ValidateNested()
  readonly song?: SongResDto;
}
