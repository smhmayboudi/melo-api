import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { ImageDto } from "./image.dto";
import { PaginationResultDto } from "./pagination.result.dto";
import { SongDto } from "./song.dto";

export class PlaylistDto {
  constructor(
    id: string,
    title: string,
    tracksCount: number,
    image: ImageDto,
    isPublic: boolean,
    releaseDate: Date,
    followersCount: number,
    songs?: PaginationResultDto<SongDto>
  ) {
    this.id = id;
    this.title = title;
    this.tracksCount = tracksCount;
    this.image = image;
    this.isPublic = isPublic;
    this.releaseDate = releaseDate;
    this.followersCount = followersCount;
    this.songs = songs;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcdef"
  })
  @IsString()
  id: string;

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
    description: "The cover",
    example: "http://www.google.com"
  })
  @Type(() => ImageDto)
  image: ImageDto;

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
    description: "The count of follwers",
    example: 0
  })
  @IsNumber()
  followersCount: number;

  @ApiProperty({
    description: "The songs"
  })
  @IsOptional()
  @Type(() => PaginationResultDto)
  songs?: PaginationResultDto<SongDto>;
}
