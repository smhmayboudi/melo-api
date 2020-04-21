import {
  IsBoolean,
  IsDate,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataImageResDto } from "./data.image.res.dto";
import { DataPaginationResDto } from "./data.pagination.res.dto";
import { DataSongResDto } from "./data.song.res.dto";

export class DataPlaylistResDto {
  constructor(
    followersCount: number,
    id: string,
    image: DataImageResDto,
    isPublic: boolean,
    releaseDate: Date,
    title: string,
    tracksCount: number,
    songs?: DataPaginationResDto<DataSongResDto>
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
    example: "0",
  })
  @IsNumberString()
  followersCount: number;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The cover",
    example: "http://www.google.com",
  })
  @ValidateNested()
  image: DataImageResDto;

  @ApiProperty({
    description: "Is it public?",
    example: false,
  })
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({
    description: "The release date",
    example: new Date(),
  })
  @IsDate()
  releaseDate: Date;

  @ApiProperty({
    description: "The title",
    example: "black count down",
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "The count of tracks",
    example: "0",
  })
  @IsNumberString()
  tracksCount: number;

  @ApiProperty({
    description: "The songs",
  })
  @IsOptional()
  @ValidateNested()
  songs?: DataPaginationResDto<DataSongResDto>;
}
