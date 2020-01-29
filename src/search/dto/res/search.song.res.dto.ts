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
import { SearchAlbumResDto } from "./search.album.res.dto";
import { SearchArtistResDto } from "./search.artist.res.dto";
import { SearchAudioResDto } from "./search.audio.res.dto";
import { SearchImageResDto } from "./search.image.res.dto";

export class SearchSongResDto {
  constructor(
    artists: SearchArtistResDto[],
    audio: SearchAudioResDto,
    duration: number,
    id: number,
    localized: boolean,
    releaseDate: Date,
    title: string,
    album?: SearchAlbumResDto,
    copyrighted?: boolean,
    downloadCount?: number,
    hasVideo?: boolean,
    image?: SearchImageResDto,
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
  @Type(() => SearchArtistResDto)
  @ValidateNested({
    each: true
  })
  artists: SearchArtistResDto[];

  @ApiProperty({
    description: "The audio"
  })
  @ValidateNested()
  audio: SearchAudioResDto;

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
  @IsNumber()
  id: number;

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
  album?: SearchAlbumResDto;

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
  image?: SearchImageResDto;

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
