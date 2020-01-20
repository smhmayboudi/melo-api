import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { ArtistType } from "../type/artist.type";
import { AlbumDto } from "./album.dto";
import { ImageDto } from "./image.dto";
import { PaginationResultDto } from "./pagination.result.dto";
import { SongDto } from "./song.dto";

export class ArtistDto {
  constructor(
    followersCount: number,
    id: string,
    type: ArtistType,
    albums?: PaginationResultDto<AlbumDto>,
    fullName?: string,
    image?: ImageDto,
    songs?: PaginationResultDto<SongDto>,
    sumSongsDownloadsCount?: number,
    tags?: string[]
  ) {
    this.followersCount = followersCount;
    this.id = id;
    this.type = type;
    this.albums = albums;
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
    example: "abcdef"
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The artist type",
    example: ArtistType.Prime
  })
  @IsEnum(ArtistType)
  type: ArtistType;

  @ApiProperty({
    description: "The albums"
  })
  @IsOptional()
  @Type(() => PaginationResultDto)
  albums?: PaginationResultDto<AlbumDto>;

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
  @Type(() => ImageDto)
  image?: ImageDto;

  @ApiProperty({
    description: "The songs"
  })
  @IsOptional()
  @Type(() => PaginationResultDto)
  songs?: PaginationResultDto<SongDto>;

  @ApiProperty({
    description: "The sum downloads of songs count",
    example: 0
  })
  @IsOptional()
  @IsNumber()
  sumSongsDownloadsCount?: number;

  @ApiProperty({
    description: "The tags",
    example: ["smith"]
  })
  @IsArray()
  @IsOptional()
  @IsString()
  tags?: string[];
}
