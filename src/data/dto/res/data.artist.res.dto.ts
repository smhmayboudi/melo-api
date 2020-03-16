import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { DataArtistType } from "../../data.artist.type";
import { DataAlbumResDto } from "./data.album.res.dto";
import { DataImageResDto } from "./data.image.res.dto";
import { DataPaginationResDto } from "./data.pagination.res.dto";
import { DataSongResDto } from "./data.song.res.dto";

export class DataArtistResDto {
  constructor(
    followersCount: number,
    id: string,
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
    example: 0
  })
  @IsNumber()
  followersCount: number;

  @ApiProperty({
    description: "The identification",
    example: 0
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The artist type",
    example: DataArtistType.prime
  })
  @IsEnum(DataArtistType)
  type: DataArtistType;

  @ApiProperty({
    description: "The albums"
  })
  @IsOptional()
  @ValidateNested()
  albums?: DataPaginationResDto<DataAlbumResDto>;

  @ApiProperty({
    description: "The following",
    example: false
  })
  @IsOptional()
  @IsBoolean()
  following?: boolean;

  @ApiProperty({
    description: "The fullname",
    example: "john smith"
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({
    description: "The name"
  })
  @IsOptional()
  @ValidateNested()
  image?: DataImageResDto;

  @ApiProperty({
    description: "The songs"
  })
  @IsOptional()
  @ValidateNested()
  songs?: DataPaginationResDto<DataSongResDto>;

  @ApiProperty({
    description: "The sum downloads of songs count",
    example: 0
  })
  @IsOptional()
  @IsNumber()
  sumSongsDownloadsCount?: number;

  @ApiProperty({
    description: "The tags",
    example: ["smith"],
    isArray: true,
    type: String
  })
  @IsArray()
  @IsOptional()
  @IsString()
  tags?: string[];
}
