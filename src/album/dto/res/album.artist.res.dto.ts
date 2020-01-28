import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { AlbumArtistType } from "../../type/album.artist-type";
import { AlbumAlbumResDto } from "./album.album.res.dto";
import { AlbumImageResDto } from "./album.image.res.dto";
import { AlbumPaginationResDto } from "./album.pagination.res.dto";
import { AlbumSongResDto } from "./album.song.res.dto";

export class AlbumArtistResDto {
  constructor(
    followersCount: number,
    id: number,
    type: AlbumArtistType,
    albums?: AlbumPaginationResDto<AlbumAlbumResDto>,
    fullName?: string,
    image?: AlbumImageResDto,
    songs?: AlbumPaginationResDto<AlbumSongResDto>,
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
    example: 0
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "The artist type",
    example: AlbumArtistType.prime
  })
  @IsEnum(AlbumArtistType)
  type: AlbumArtistType;

  @ApiProperty({
    description: "The albums"
  })
  @IsOptional()
  @ValidateNested()
  albums?: AlbumPaginationResDto<AlbumAlbumResDto>;

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
  image?: AlbumImageResDto;

  @ApiProperty({
    description: "The songs"
  })
  @IsOptional()
  @ValidateNested()
  songs?: AlbumPaginationResDto<AlbumSongResDto>;

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
