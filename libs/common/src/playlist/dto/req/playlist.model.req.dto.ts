import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
} from "@melo/common";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";

import { PlaylistConfigReqDto } from ".";
import { Type } from "class-transformer";

export class PlaylistModelReqDto {
  constructor(
    _id: string,
    config: PlaylistConfigReqDto,
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    downloads_count: number,
    followers_count: number,
    isPublic: boolean,
    owner_user_id: number,
    photo_id: string,
    release_date: Date,
    songs_ids: number[],
    title: string,
    tracks_count: number
  ) {
    this._id = _id;
    this.config = config;
    this.dataConfigElasticsearch = dataConfigElasticsearch;
    this.dataConfigImage = dataConfigImage;
    this.downloads_count = downloads_count;
    this.followers_count = followers_count;
    this.isPublic = isPublic;
    this.owner_user_id = owner_user_id;
    this.photo_id = photo_id;
    this.release_date = release_date;
    this.songs_ids = songs_ids;
    this.title = title;
    this.tracks_count = tracks_count;
  }
  @ApiHideProperty()
  @IsString()
  readonly _id: string;

  @ApiHideProperty()
  @Type(() => PlaylistConfigReqDto)
  @ValidateNested()
  readonly config: PlaylistConfigReqDto;

  @ApiHideProperty()
  @Type(() => DataConfigImageReqDto)
  @ValidateNested()
  readonly dataConfigElasticsearch: DataConfigElasticsearchReqDto;

  @ApiHideProperty()
  @Type(() => DataConfigImageReqDto)
  @ValidateNested()
  readonly dataConfigImage: DataConfigImageReqDto;

  @ApiProperty({
    description: "The download counts",
    example: 0,
  })
  @IsNumber()
  downloads_count: number;

  @ApiProperty({
    description: "The follower count",
    example: 0,
  })
  @IsNumber()
  followers_count: number;

  @ApiProperty({
    description: "The public",
    example: false,
  })
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({
    description: "The owner identification",
    example: 0,
  })
  @IsNumber()
  owner_user_id: number;

  @ApiProperty({
    description: "The photo identification",
    example: "abcdef",
  })
  @IsString()
  photo_id: string;

  @ApiProperty({
    description: "The release date",
    example: new Date(),
  })
  @IsDate()
  release_date: Date;

  @ApiProperty({
    description: "The songs identifications",
    example: [0],
  })
  @IsArray()
  @IsString()
  @ValidateNested({
    each: true,
  })
  songs_ids: number[];

  @ApiProperty({
    description: "The title",
    example: "abcdef",
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "The total songs",
    example: 0,
  })
  @IsNumber()
  tracks_count: number;
}
