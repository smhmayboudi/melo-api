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
import { PlaylistArtistResDto } from "./playlist.artist.res.dto";
import { PlaylistImageResDto } from "./playlist.image.res.dto";
import { PlaylistPaginationResDto } from "./playlist.pagination.res.dto";
import { PlaylistSongResDto } from "./playlist.song.res.dto";

export class PlaylistAlbumResDto {
  constructor(
    name: string,
    releaseDate: Date,
    artists?: PlaylistArtistResDto[],
    downloadCount?: number,
    id?: string,
    image?: PlaylistImageResDto,
    songs?: PlaylistPaginationResDto<PlaylistSongResDto>,
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
  @Type(() => PlaylistArtistResDto)
  @ValidateNested({
    each: true
  })
  artists?: PlaylistArtistResDto[];

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
  image?: PlaylistImageResDto;

  @ApiProperty({
    description: "The image"
  })
  @IsOptional()
  @ValidateNested()
  songs?: PlaylistPaginationResDto<PlaylistSongResDto>;

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
