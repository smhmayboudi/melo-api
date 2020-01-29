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
import { SongArtistResDto } from "./song.artist.res.dto";
import { SongImageResDto } from "./song.image.res.dto";
import { SongPaginationResDto } from "./song.pagination.res.dto";
import { SongSongResDto } from "./song.song.res.dto";

export class SongAlbumResDto {
  constructor(
    name: string,
    releaseDate: Date,
    artists?: SongArtistResDto[],
    downloadCount?: number,
    id?: string,
    image?: SongImageResDto,
    songs?: SongPaginationResDto<SongSongResDto>,
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
  @Type(() => SongArtistResDto)
  @ValidateNested({
    each: true
  })
  artists?: SongArtistResDto[];

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
  image?: SongImageResDto;

  @ApiProperty({
    description: "The image"
  })
  @IsOptional()
  @ValidateNested()
  songs?: SongPaginationResDto<SongSongResDto>;

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
