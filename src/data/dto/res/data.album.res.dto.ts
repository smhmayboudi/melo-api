import {
  IsArray,
  IsDate,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataArtistResDto } from "./data.artist.res.dto";
import { DataImageResDto } from "./data.image.res.dto";
import { DataPaginationResDto } from "./data.pagination.res.dto";
import { DataSongResDto } from "./data.song.res.dto";
import { Type } from "class-transformer";

export class DataAlbumResDto {
  constructor(
    name: string,
    releaseDate: Date,
    artists?: DataArtistResDto[],
    downloadCount?: number,
    id?: number,
    image?: DataImageResDto,
    songs?: DataPaginationResDto<DataSongResDto>,
    tags?: string[],
    tracksCount?: number
  ) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.artists = artists;
    this.downloadCount = downloadCount;
    this.id = id;
    this.image = image;
    this.songs = songs;
    this.tags = tags;
    this.tracksCount = tracksCount;
  }

  @ApiProperty({
    description: "The name",
    example: "smith",
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: "The downlaod count",
    example: new Date(),
  })
  @IsDate()
  readonly releaseDate: Date;

  @ApiProperty({
    description: "The artists",
    isArray: true,
    type: DataArtistResDto,
  })
  @IsArray()
  @IsOptional()
  @Type(() => DataArtistResDto)
  @ValidateNested({
    each: true,
  })
  readonly artists?: DataArtistResDto[];

  @ApiProperty({
    description: "The downlaod count",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly downloadCount?: number;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly id?: number;

  @ApiProperty({
    description: "The image",
  })
  @IsOptional()
  @ValidateNested()
  readonly image?: DataImageResDto;

  @ApiProperty({
    description: "The image",
  })
  @IsOptional()
  @ValidateNested()
  readonly songs?: DataPaginationResDto<DataSongResDto>;

  @ApiProperty({
    description: "The tags",
    example: ["pop"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsOptional()
  @IsString()
  readonly tags?: string[];

  @ApiProperty({
    description: "The track count",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly tracksCount?: number;
}
