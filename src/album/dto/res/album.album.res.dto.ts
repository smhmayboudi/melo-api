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
import { AlbumArtistResDto } from "./album.artist.res.dto";
import { AlbumImageResDto } from "./album.image.res.dto";
import { AlbumPaginationResDto } from "./album.pagination.res.dto";
import { AlbumSongResDto } from "./album.song.res.dto";

export class AlbumAlbumResDto {
  constructor(
    name: string,
    releaseDate: Date,
    artists?: AlbumArtistResDto[],
    downloadCount?: number,
    id?: string,
    image?: AlbumImageResDto,
    songs?: AlbumPaginationResDto<AlbumSongResDto>,
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
  @Type(() => AlbumArtistResDto)
  @ValidateNested({
    each: true
  })
  artists?: AlbumArtistResDto[];

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
  image?: AlbumImageResDto;

  @ApiProperty({
    description: "The image"
  })
  @IsOptional()
  @ValidateNested()
  songs?: AlbumPaginationResDto<AlbumSongResDto>;

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
