import {
  IsBoolean,
  IsDate,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataImageResDto } from "../../../data/dto/res/data.image.res.dto";
import { SongResDto } from "../../../song/dto/res/song.res.dto";
import { Type } from "class-transformer";

export class PlaylistResDto {
  constructor(
    followersCount: number,
    id: string,
    image: DataImageResDto,
    isPublic: boolean,
    releaseDate: Date,
    title: string,
    tracksCount: number,
    songs?: SongResDto[]
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
  readonly followersCount: number;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: "The cover",
    example: "http://www.google.com",
  })
  @Type(() => DataImageResDto)
  @ValidateNested()
  readonly image: DataImageResDto;

  @ApiProperty({
    description: "Is it public?",
    example: false,
  })
  @IsBoolean()
  readonly isPublic: boolean;

  @ApiProperty({
    description: "The release date",
    example: new Date(),
  })
  @IsDate()
  @Type(() => Date)
  readonly releaseDate: Date;

  @ApiProperty({
    description: "The title",
    example: "black count down",
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: "The count of tracks",
    example: "0",
  })
  @IsNumberString()
  readonly tracksCount: number;

  @ApiProperty({
    description: "The songs",
  })
  @IsOptional()
  @ValidateNested()
  readonly songs?: SongResDto[];
}
