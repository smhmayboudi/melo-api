import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataConfigElasticsearchReqDto } from "../req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../req/data.config-image.req.dto";
import { DataElasticsearchArtistResDto } from "./data.elasticsearch-artist.res.dto";
import { DataSearchType } from "../../data.search.type";
import { Type } from "class-transformer";

export class DataElasticsearchSearchResDto {
  constructor(
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    album: string,
    artist_followers_count: number,
    artist_full_name: string,
    artist_id: number,
    artists: DataElasticsearchArtistResDto[],
    duration: number,
    id: number,
    max_audio_rate: number,
    release_date: Date,
    type: DataSearchType,
    album_downloads_count?: number,
    album_id?: number,
    album_tracks_count?: number,
    artist_sum_downloads_count?: number,
    copyright?: boolean,
    downloads_count?: number,
    has_cover?: boolean,
    has_video?: boolean,
    localize?: boolean,
    lyrics?: string,
    suggested?: number,
    tags?: { tag: string }[],
    title?: string,
    unique_name?: string
  ) {
    this.dataConfigElasticsearch = dataConfigElasticsearch;
    this.dataConfigImage = dataConfigImage;
    this.album = album;
    this.artist_followers_count = artist_followers_count;
    this.artist_full_name = artist_full_name;
    this.artist_id = artist_id;
    this.artists = artists;
    this.duration = duration;
    this.id = id;
    this.max_audio_rate = max_audio_rate;
    this.release_date = release_date;
    this.type = type;
    this.album_downloads_count = album_downloads_count;
    this.album_id = album_id;
    this.album_tracks_count = album_tracks_count;
    this.artist_sum_downloads_count = artist_sum_downloads_count;
    this.copyright = copyright;
    this.downloads_count = downloads_count;
    this.has_cover = has_cover;
    this.has_video = has_video;
    this.localize = localize;
    this.lyrics = lyrics;
    this.suggested = suggested;
    this.tags = tags;
    this.title = title;
    this.unique_name = unique_name;
  }

  @ApiProperty({
    description: "the config",
    type: DataConfigElasticsearchReqDto,
  })
  @Type(() => DataConfigElasticsearchReqDto)
  @ValidateNested()
  readonly dataConfigElasticsearch: DataConfigElasticsearchReqDto;

  @ApiProperty({
    description: "the image config",
    example: "",
    type: DataConfigImageReqDto,
  })
  @Type(() => DataConfigImageReqDto)
  @ValidateNested()
  readonly dataConfigImage: DataConfigImageReqDto;

  @ApiProperty({
    description: "the album",
    example: "0",
  })
  @IsString()
  readonly album: string;

  @ApiProperty({
    description: "the artist follower count",
    example: 0,
  })
  @IsNumber()
  readonly artist_followers_count: number;

  @ApiProperty({
    description: "the artist name",
    example: "abcdef",
  })
  @IsString()
  readonly artist_full_name: string;

  @ApiProperty({
    description: "the artist identifier",
    example: 0,
  })
  @IsNumber()
  readonly artist_id: number;

  @ApiProperty({
    description: "the artist",
    isArray: true,
    type: DataElasticsearchArtistResDto,
  })
  @Type(() => DataElasticsearchArtistResDto)
  @ValidateNested({
    each: true,
  })
  readonly artists: DataElasticsearchArtistResDto[];

  @ApiProperty({
    description: "song duration",
    example: 0,
  })
  @IsNumber()
  readonly duration: number;

  @ApiProperty({
    description: "The identification",
    example: 0,
  })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    description: "the audio bitrate",
    example: 0,
  })
  @IsNumber()
  readonly max_audio_rate: number;

  @ApiProperty({
    description: "the release date",
    example: new Date(),
  })
  @IsDate()
  readonly release_date: Date;

  @ApiProperty({
    description: "the search type",
    type: DataSearchType,
  })
  @IsEnum(DataSearchType)
  readonly type: DataSearchType;

  @ApiProperty({
    description: "the album download count",
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  readonly album_downloads_count?: number;

  @ApiProperty({
    description: "the album identifier",
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  readonly album_id?: number;

  @ApiProperty({
    description: "the album tracks count",
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  readonly album_tracks_count?: number;

  @ApiProperty({
    description: "the artist total downloads",
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  readonly artist_sum_downloads_count?: number;

  @ApiProperty({
    description: "song copyrited",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly copyright?: boolean;

  @ApiProperty({
    description: "the download counts",
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  readonly downloads_count?: number;

  @ApiProperty({
    description: "song has cover",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly has_cover?: boolean;

  @ApiProperty({
    description: "song has video",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly has_video?: boolean;

  @ApiProperty({
    description: "song localized",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly localize?: boolean;

  @ApiProperty({
    description: "songs lyrics",
    example: "abcdef",
  })
  @IsOptional()
  @IsString()
  readonly lyrics?: string;

  @ApiProperty({
    description: "song is suggested",
    example: false,
  })
  @IsOptional()
  @IsNumber()
  readonly suggested?: number;

  @ApiProperty({
    description: "tags",
    example: ["abcdef"],
  })
  @IsOptional()
  @IsString()
  @IsArray()
  readonly tags?: { tag: string }[];

  @ApiProperty({
    description: "the title",
    example: "abcdef",
  })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({
    description: "song or podcast unique nam",
    example: "abcdef",
  })
  @IsOptional()
  @IsString()
  readonly unique_name?: string;
}
