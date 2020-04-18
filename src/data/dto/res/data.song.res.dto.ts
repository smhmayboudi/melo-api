import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataAlbumResDto } from "./data.album.res.dto";
import { DataArtistResDto } from "./data.artist.res.dto";
import { DataAudioResDto } from "./data.audio.res.dto";
import { DataImageResDto } from "./data.image.res.dto";
import { Type } from "class-transformer";

export class DataSongResDto {
  constructor(
    artists: DataArtistResDto[],
    duration: number,
    id: number,
    localized: boolean,
    releaseDate: Date,
    title: string,
    audio?: DataAudioResDto,
    album?: DataAlbumResDto,
    copyrighted?: boolean,
    downloadCount?: number,
    hasVideo?: boolean,
    image?: DataImageResDto,
    likeCount?: number,
    liked?: boolean,
    lyrics?: string,
    tags?: string[]
  ) {
    this.artists = artists;
    this.duration = duration;
    this.id = id;
    this.localized = localized;
    this.releaseDate = releaseDate;
    this.title = title;
    this.audio = audio;
    this.album = album;
    this.copyrighted = copyrighted;
    this.downloadCount = downloadCount;
    this.hasVideo = hasVideo;
    this.image = image;
    this.likeCount = likeCount;
    this.liked = liked;
    this.lyrics = lyrics;
    this.tags = tags;
  }

  @ApiProperty({
    description: "The artists",
    isArray: true,
    type: DataArtistResDto,
  })
  @IsArray()
  @Type(() => DataArtistResDto)
  @ValidateNested({
    each: true,
  })
  artists: DataArtistResDto[];

  @ApiProperty({
    description: "The audio",
  })
  @IsOptional()
  @ValidateNested()
  audio?: DataAudioResDto;

  @ApiProperty({
    description: "The duration",
    example: 0,
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "The localized",
    example: false,
  })
  @IsBoolean()
  localized: boolean;

  @ApiProperty({
    description: "The date of release",
    example: new Date(),
  })
  @IsDate()
  releaseDate: Date;

  @ApiProperty({
    description: "The title",
    example: "black cover",
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "The album",
  })
  @IsOptional()
  @ValidateNested()
  album?: DataAlbumResDto;

  @ApiProperty({
    description: "The copyright",
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  copyrighted?: boolean;

  @ApiProperty({
    description: "The couont of download",
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  downloadCount?: number;

  @ApiProperty({
    description: "The has video",
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  hasVideo?: boolean;

  @ApiProperty({
    description: "The image",
  })
  @IsOptional()
  @ValidateNested()
  image?: DataImageResDto;

  @ApiProperty({
    description: "The count of like",
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  likeCount?: number;

  @ApiProperty({
    description: "If user liked the song",
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  liked?: boolean;

  @ApiProperty({
    description: "The lyrics",
    example: "The black cover",
  })
  @IsOptional()
  @IsString()
  lyrics?: string;

  @ApiProperty({
    description: "The tags",
    example: ["pop"],
    isArray: true,
    type: String,
  })
  @IsOptional()
  @IsString()
  tags?: string[];
}
