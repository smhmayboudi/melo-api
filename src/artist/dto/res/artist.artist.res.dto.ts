import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { ArtistArtistType } from "../../type/artist.artist-type";
import { ArtistAlbumResDto } from "./artist.album.res.dto";
import { ArtistImageResDto } from "./artist.image.res.dto";
import { ArtistPaginationResDto } from "./artist.pagination.res.dto";
import { ArtistSongResDto } from "./artist.song.res.dto";

export class ArtistArtistResDto {
  constructor(
    followersCount: number,
    id: string,
    type: ArtistArtistType,
    albums?: ArtistPaginationResDto<ArtistAlbumResDto>,
    fullName?: string,
    image?: ArtistImageResDto,
    songs?: ArtistPaginationResDto<ArtistSongResDto>,
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
    example: ArtistArtistType.prime
  })
  @IsEnum(ArtistArtistType)
  type: ArtistArtistType;

  @ApiProperty({
    description: "The albums"
  })
  @IsOptional()
  @ValidateNested()
  albums?: ArtistPaginationResDto<ArtistAlbumResDto>;

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
  image?: ArtistImageResDto;

  @ApiProperty({
    description: "The songs"
  })
  @IsOptional()
  @ValidateNested()
  songs?: ArtistPaginationResDto<ArtistSongResDto>;

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
