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
import { ArtistArtistResDto } from "./artist.artist.res.dto";
import { ArtistImageResDto } from "./artist.image.res.dto";
import { ArtistPaginationResDto } from "./artist.pagination.res.dto";
import { ArtistSongResDto } from "./artist.song.res.dto";

export class ArtistAlbumResDto {
  constructor(
    name: string,
    releaseDate: Date,
    artists?: ArtistArtistResDto[],
    downloadCount?: number,
    id?: string,
    image?: ArtistImageResDto,
    songs?: ArtistPaginationResDto<ArtistSongResDto>,
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
  @Type(() => ArtistArtistResDto)
  @ValidateNested({
    each: true
  })
  artists?: ArtistArtistResDto[];

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
  image?: ArtistImageResDto;

  @ApiProperty({
    description: "The image"
  })
  @IsOptional()
  @ValidateNested()
  songs?: ArtistPaginationResDto<ArtistSongResDto>;

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
