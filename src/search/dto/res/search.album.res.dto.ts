import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { SearchArtistResDto } from "./search.artist.res.dto";
import { SearchImageResDto } from "./search.image.res.dto";
import { SearchPaginationResDto } from "./search.pagination.res.dto";
import { SearchSongResDto } from "./search.song.res.dto";

export class SearchAlbumResDto {
  constructor(
    name: string,
    releaseDate: Date,
    artists?: SearchArtistResDto[],
    downloadCount?: number,
    id?: string,
    image?: SearchImageResDto,
    songs?: SearchPaginationResDto<SearchSongResDto>,
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
    example: "smith"
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "The downlaod count",
    example: new Date()
  })
  @IsDate()
  releaseDate: Date;

  @ApiProperty({
    description: "The artists",
    example: ["smith"]
  })
  @IsArray()
  @IsOptional()
  @Type(() => SearchArtistResDto)
  @ValidateNested({
    each: true
  })
  artists?: SearchArtistResDto[];

  @ApiProperty({
    description: "The downlaod count",
    example: 0
  })
  @IsNumber()
  @IsOptional()
  downloadCount?: number;

  @ApiProperty({
    description: "The identification",
    example: "abcdef"
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: "The image"
  })
  @IsOptional()
  @ValidateNested()
  image?: SearchImageResDto;

  @ApiProperty({
    description: "The image"
  })
  @IsOptional()
  @ValidateNested()
  songs?: SearchPaginationResDto<SearchSongResDto>;

  @ApiProperty({
    description: "The tags",
    example: ["pop"]
  })
  @IsArray()
  @IsOptional()
  @IsString()
  tags?: string[];

  @ApiProperty({
    description: "The track count",
    example: 0
  })
  @IsNumber()
  @IsOptional()
  tracksCount?: number;
}
