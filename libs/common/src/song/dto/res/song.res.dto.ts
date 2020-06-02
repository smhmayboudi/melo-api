import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { AlbumResDto } from "../../../album/dto/res/album.res.dto";
import { ApiProperty } from "@nestjs/swagger";
import { ArtistResDto } from "../../../artist/dto/res/artist.res.dto";
import { ConstImageResDto } from "../../../const/dto/res/const.image.res.dto";
import { SongAudioResDto } from "./song.audio.res.dto";
import { Type } from "class-transformer";

export class SongResDto {
  constructor(
    artists: ArtistResDto[],
    duration: number,
    id: number,
    localized: boolean,
    releaseDate: Date,
    title: string,
    audio?: SongAudioResDto,
    album?: AlbumResDto,
    copyrighted?: boolean,
    downloadCount?: number,
    hasVideo?: boolean,
    image?: ConstImageResDto,
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
    type: ArtistResDto,
  })
  @IsArray()
  @Type(() => ArtistResDto)
  @ValidateNested({
    each: true,
  })
  readonly artists: ArtistResDto[];

  @ApiProperty({
    description: "The audio",
  })
  @IsOptional()
  @Type(() => SongAudioResDto)
  @ValidateNested()
  readonly audio?: SongAudioResDto;

  @ApiProperty({
    description: "The duration",
    example: "0",
  })
  @IsNumberString()
  readonly duration: number;

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "The localized",
    example: false,
  })
  @IsBoolean()
  readonly localized: boolean;

  @ApiProperty({
    description: "The date of release",
    example: new Date(),
  })
  @IsDate()
  @Type(() => Date)
  readonly releaseDate: Date;

  @ApiProperty({
    description: "The title",
    example: "black cover",
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: "The album",
  })
  @IsOptional()
  @Type(() => AlbumResDto)
  @ValidateNested()
  readonly album?: AlbumResDto;

  @ApiProperty({
    description: "The copyright",
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly copyrighted?: boolean;

  @ApiProperty({
    description: "The couont of download",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly downloadCount?: number;

  @ApiProperty({
    description: "The has video",
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly hasVideo?: boolean;

  @ApiProperty({
    description: "The image",
  })
  @IsOptional()
  @Type(() => ConstImageResDto)
  @ValidateNested()
  readonly image?: ConstImageResDto;

  @ApiProperty({
    description: "The count of like",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly likeCount?: number;

  @ApiProperty({
    description: "If user liked the song",
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly liked?: boolean;

  @ApiProperty({
    description: "The lyrics",
    example: "The black cover",
  })
  @IsOptional()
  @IsString()
  readonly lyrics?: string;

  @ApiProperty({
    description: "The tags",
    example: ["pop"],
    isArray: true,
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly tags?: string[];
}
