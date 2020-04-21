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
  name: string;

  @ApiProperty({
    description: "The downlaod count",
    example: new Date(),
  })
  @IsDate()
  releaseDate: Date;

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
  artists?: DataArtistResDto[];

  @ApiProperty({
    description: "The downlaod count",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  downloadCount?: number;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: "The image",
  })
  @IsOptional()
  @ValidateNested()
  image?: DataImageResDto;

  @ApiProperty({
    description: "The image",
  })
  @IsOptional()
  @ValidateNested()
  songs?: DataPaginationResDto<DataSongResDto>;

  @ApiProperty({
    description: "The tags",
    example: ["pop"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsOptional()
  @IsString()
  tags?: string[];

  @ApiProperty({
    description: "The track count",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  tracksCount?: number;
}
