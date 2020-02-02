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
import { SongAlbumResDto } from "../res/song.album.res.dto";
import { SongArtistResDto } from "../res/song.artist.res.dto";
import { SongAudioResDto } from "../res/song.audio.res.dto";
import { SongImageResDto } from "../res/song.image.res.dto";

export class SongMixResDto {
  constructor(
    artists: SongArtistResDto[],
    audio: SongAudioResDto,
    duration: number,
    id: string,
    localized: boolean,
    releaseDate: Date,
    title: string,
    album?: SongAlbumResDto,
    copyrighted?: boolean,
    downloadCount?: number,
    hasVideo?: boolean,
    image?: SongImageResDto,
    likeCount?: number,
    liked?: boolean,
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
    this.liked = liked;
    this.lyrics = lyrics;
    this.tags = tags;
  }

  @ApiProperty({
    description: "The artists"
  })
  @IsArray()
  @Type(() => SongArtistResDto)
  @ValidateNested({
    each: true
  })
  artists: SongArtistResDto[];

  @ApiProperty({
    description: "The audio"
  })
  @ValidateNested()
  audio: SongAudioResDto;

  @ApiProperty({
    description: "The duration",
    example: 0
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: "The identification",
    example: 0
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The localized",
    example: false
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
  album?: SongAlbumResDto;

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
  image?: SongImageResDto;

  @ApiProperty({
    description: "The count of like",
    example: 0
  })
  @IsNumber()
  @IsOptional()
  likeCount?: number;

  @ApiProperty({
    description: "If user liked the song",
    example: false
  })
  @IsBoolean()
  @IsOptional()
  liked?: boolean;

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
