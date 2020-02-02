import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { SearchArtistType } from "../../type/search.artist-type";
import { SearchAlbumResDto } from "./search.album.res.dto";
import { SearchImageResDto } from "./search.image.res.dto";
import { SearchPaginationResDto } from "./search.pagination.res.dto";
import { SearchSongResDto } from "./search.song.res.dto";

export class SearchArtistResDto {
  constructor(
    followersCount: number,
    id: string,
    type: SearchArtistType,
    albums?: SearchPaginationResDto<SearchAlbumResDto>,
    fullName?: string,
    image?: SearchImageResDto,
    songs?: SearchPaginationResDto<SearchSongResDto>,
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
    example: SearchArtistType.prime
  })
  @IsEnum(SearchArtistType)
  type: SearchArtistType;

  @ApiProperty({
    description: "The albums"
  })
  @IsOptional()
  @ValidateNested()
  albums?: SearchPaginationResDto<SearchAlbumResDto>;

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
  image?: SearchImageResDto;

  @ApiProperty({
    description: "The songs"
  })
  @IsOptional()
  @ValidateNested()
  songs?: SearchPaginationResDto<SearchSongResDto>;

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
