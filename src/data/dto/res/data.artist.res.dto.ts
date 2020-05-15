import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataAlbumResDto } from "./data.album.res.dto";
import { DataArtistType } from "../../data.artist.type";
import { DataImageResDto } from "./data.image.res.dto";
import { DataPaginationResDto } from "./data.pagination.res.dto";
import { DataSongResDto } from "./data.song.res.dto";

export class DataArtistResDto {
  constructor(
    followersCount: number,
    id: number,
    type: DataArtistType,
    albums?: DataPaginationResDto<DataAlbumResDto>,
    following?: boolean,
    fullName?: string,
    image?: DataImageResDto,
    songs?: DataPaginationResDto<DataSongResDto>,
    sumSongsDownloadsCount?: number,
    tags?: string[]
  ) {
    this.followersCount = followersCount;
    this.id = id;
    this.type = type;
    this.albums = albums;
    this.following = following;
    this.fullName = fullName;
    this.image = image;
    this.songs = songs;
    this.sumSongsDownloadsCount = sumSongsDownloadsCount;
    this.tags = tags;
  }

  @ApiProperty({
    description: "The follwer count",
    example: "0",
  })
  @IsNumberString()
  readonly followersCount: number;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "The artist type",
    example: DataArtistType.prime,
  })
  @IsEnum(DataArtistType)
  readonly type: DataArtistType;

  @ApiProperty({
    description: "The albums",
  })
  @IsOptional()
  @ValidateNested()
  readonly albums?: DataPaginationResDto<DataAlbumResDto>;

  @ApiProperty({
    description: "The following",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly following?: boolean;

  @ApiProperty({
    description: "The fullname",
    example: "john smith",
  })
  @IsOptional()
  @IsString()
  readonly fullName?: string;

  @ApiProperty({
    description: "The name",
  })
  @IsOptional()
  @ValidateNested()
  readonly image?: DataImageResDto;

  @ApiProperty({
    description: "The songs",
  })
  @IsOptional()
  @ValidateNested()
  readonly songs?: DataPaginationResDto<DataSongResDto>;

  @ApiProperty({
    description: "The sum downloads of songs count",
    example: "0",
  })
  @IsOptional()
  @IsNumberString()
  readonly sumSongsDownloadsCount?: number;

  @ApiProperty({
    description: "The tags",
    example: ["smith"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsOptional()
  @IsString()
  readonly tags?: string[];
}
