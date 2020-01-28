import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { PlaylistImageResDto } from "./playlist.image.res.dto";
import { PlaylistPaginationResDto } from "./playlist.pagination.res.dto";
import { PlaylistSongResDto } from "./playlist.song.res.dto";

export class PlaylistPlaylistResDto {
  constructor(
    followersCount: number,
    id: string,
    image: PlaylistImageResDto,
    isPublic: boolean,
    releaseDate: Date,
    title: string,
    tracksCount: number,
    songs?: PlaylistPaginationResDto<PlaylistSongResDto>
  ) {
    this.followersCount = followersCount;
    this.id = id;
    this.image = image;
    this.isPublic = isPublic;
    this.releaseDate = releaseDate;
    this.title = title;
    this.tracksCount = tracksCount;
    this.songs = songs;
  }

  @ApiProperty({
    description: "The count of follwers",
    example: 0
  })
  @IsNumber()
  followersCount: number;

  @ApiProperty({
    description: "The identification",
    example: "abcdef"
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The cover",
    example: "http://www.google.com"
  })
  @ValidateNested()
  image: PlaylistImageResDto;

  @ApiProperty({
    description: "Is it public?",
    example: "abcdef"
  })
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({
    description: "The release date",
    example: new Date()
  })
  @IsDate()
  releaseDate: Date;

  @ApiProperty({
    description: "The title",
    example: "black count down"
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "The count of tracks",
    example: 0
  })
  @IsNumber()
  tracksCount: number;

  @ApiProperty({
    description: "The songs"
  })
  @IsOptional()
  @ValidateNested()
  songs?: PlaylistPaginationResDto<PlaylistSongResDto>;
}
