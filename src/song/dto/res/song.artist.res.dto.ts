import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { SongArtistType } from "../../type/song.artist-type";
import { SongAlbumResDto } from "./song.album.res.dto";
import { SongImageResDto } from "./song.image.res.dto";
import { SongPaginationResDto } from "./song.pagination.res.dto";
import { SongSongResDto } from "./song.song.res.dto";

export class SongArtistResDto {
  constructor(
    followersCount: number,
    id: string,
    type: SongArtistType,
    albums?: SongPaginationResDto<SongAlbumResDto>,
    fullName?: string,
    image?: SongImageResDto,
    songs?: SongPaginationResDto<SongSongResDto>,
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
  @IsString()
  id: string;

  @ApiProperty({
    description: "The artist type",
    example: SongArtistType.prime
  })
  @IsEnum(SongArtistType)
  type: SongArtistType;

  @ApiProperty({
    description: "The albums"
  })
  @IsOptional()
  @ValidateNested()
  albums?: SongPaginationResDto<SongAlbumResDto>;

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
  image?: SongImageResDto;

  @ApiProperty({
    description: "The songs"
  })
  @IsOptional()
  @ValidateNested()
  songs?: SongPaginationResDto<SongSongResDto>;

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
