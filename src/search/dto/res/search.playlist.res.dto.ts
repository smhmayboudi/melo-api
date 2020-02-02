import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { SearchImageResDto } from "./search.image.res.dto";
import { SearchPaginationResDto } from "./search.pagination.res.dto";
import { SearchSongResDto } from "./search.song.res.dto";

export class SearchPlaylistResDto {
  constructor(
    followersCount: number,
    id: string,
    image: SearchImageResDto,
    isPublic: boolean,
    releaseDate: Date,
    title: string,
    tracksCount: number,
    songs?: SearchPaginationResDto<SearchSongResDto>
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
    description: "The cover",
    example: "http://www.google.com"
  })
  @ValidateNested()
  image: SearchImageResDto;

  @ApiProperty({
    description: "Is it public?",
    example: false
  })
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({
    description: "The release date",
    example: new Date()
  })
  @IsDate()
  releaseDate: Date;

  @ApiProperty({
    description: "The title",
    example: "black count down"
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "The count of tracks",
    example: 0
  })
  @IsNumber()
  tracksCount: number;

  @ApiProperty({
    description: "The songs"
  })
  @IsOptional()
  @ValidateNested()
  songs?: SearchPaginationResDto<SearchSongResDto>;
}
