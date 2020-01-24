import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { AlbumDto } from "./album.dto";
import { ArtistDto } from "./artist.dto";
import { AudioDto } from "./audio.dto";
import { ImageDto } from "./image.dto";

export class SongDto {
  constructor(
    artists: ArtistDto[],
    audio: AudioDto,
    duration: number,
    id: string,
    localized: boolean,
    releaseDate: Date,
    title: string,
    album?: AlbumDto,
    copyrighted?: boolean,
    downloadCount?: number,
    hasVideo?: boolean,
    image?: ImageDto,
    likeCount?: number,
    lyrics?: string,
    tags?: string[]
  ) {
    this.artists = artists;
    this.audio = audio;
    this.duration = duration;
    this.id = id;
    this.localized = localized;
    this.releaseDate = releaseDate;
    this.title = title;
    this.album = album;
    this.copyrighted = copyrighted;
    this.downloadCount = downloadCount;
    this.hasVideo = hasVideo;
    this.image = image;
    this.likeCount = likeCount;
    this.lyrics = lyrics;
    this.tags = tags;
  }

  @ApiProperty({
    description: "The artists"
  })
  @IsArray()
  @Type(() => ArtistDto)
  @ValidateNested({
    each: true
  })
  artists: ArtistDto[];

  @ApiProperty({
    description: "The audio"
  })
  @ValidateNested()
  audio: AudioDto;

  @ApiProperty({
    description: "The duration",
    example: 0
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: "The identification",
    example: "abcdef"
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The localized",
    example: "fa"
  })
  @IsBoolean()
  localized: boolean;

  @ApiProperty({
    description: "The date of release",
    example: new Date()
  })
  @IsDate()
  releaseDate: Date;

  @ApiProperty({
    description: "The title",
    example: "black cover"
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "The album"
  })
  @IsOptional()
  @ValidateNested()
  album?: AlbumDto;

  @ApiProperty({
    description: "The copyright",
    example: false
  })
  @IsBoolean()
  @IsOptional()
  copyrighted?: boolean;

  @ApiProperty({
    description: "The couont of download",
    example: 0
  })
  @IsNumber()
  @IsOptional()
  downloadCount?: number;

  @ApiProperty({
    description: "The has video",
    example: false
  })
  @IsBoolean()
  @IsOptional()
  hasVideo?: boolean;

  @ApiProperty({
    description: "The image"
  })
  @IsOptional()
  @ValidateNested()
  image?: ImageDto;

  @ApiProperty({
    description: "The count of like",
    example: 0
  })
  @IsNumber()
  @IsOptional()
  likeCount?: number;

  @ApiProperty({
    description: "The lyrics",
    example: "The black cover"
  })
  @IsOptional()
  @IsString()
  lyrics?: string;

  @ApiProperty({
    description: "The tags",
    example: ["pop"]
  })
  @IsOptional()
  @IsString()
  tags?: string[];
}
