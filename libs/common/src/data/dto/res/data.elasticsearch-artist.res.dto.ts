import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { DataArtistType } from "../../data.artist.type";
import { DataConfigElasticsearchReqDto } from "../req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../req/data.config-image.req.dto";
import { Type } from "class-transformer";

export class DataElasticsearchArtistResDto {
  constructor(
    available: boolean,
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    followers_count: number,
    full_name: string,
    has_cover: boolean,
    id: number,
    popular: boolean,
    sum_downloads_count: number,
    type: DataArtistType,
    tags?: { tag: string }[]
  ) {
    this.available = available;
    this.dataConfigElasticsearch = dataConfigElasticsearch;
    this.dataConfigImage = dataConfigImage;
    this.followers_count = followers_count;
    this.full_name = full_name;
    this.has_cover = has_cover;
    this.id = id;
    this.popular = popular;
    this.sum_downloads_count = sum_downloads_count;
    this.type = type;
    this.tags = tags;
  }
  @ApiProperty({
    description: "artist availability",
    example: false,
  })
  @IsBoolean()
  readonly available: boolean;

  @ApiProperty({
    description: "the config",
    type: DataConfigElasticsearchReqDto,
  })
  @Type(() => DataConfigElasticsearchReqDto)
  @ValidateNested()
  readonly dataConfigElasticsearch: DataConfigElasticsearchReqDto;

  @ApiProperty({
    description: "the image config",
    type: DataConfigImageReqDto,
  })
  @Type(() => DataConfigImageReqDto)
  @ValidateNested()
  readonly dataConfigImage: DataConfigImageReqDto;

  @ApiProperty({
    description: "the follower count",
    example: 0,
  })
  @IsNumber()
  readonly followers_count: number;

  @ApiProperty({
    description: "the artist name",
    example: "ancdef",
  })
  readonly full_name: string;

  @ApiProperty({
    description: "artist has cover",
    example: false,
  })
  @IsBoolean()
  readonly has_cover: boolean;

  @ApiProperty({
    description: "The identification",
    example: 0,
  })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    description: "artist is popular",
    example: false,
  })
  @IsBoolean()
  readonly popular: boolean;

  @ApiProperty({
    description: "the artist total downloads",
    example: 0,
  })
  @IsNumber()
  readonly sum_downloads_count: number;

  @ApiProperty({
    description: "the artist type",
    type: DataArtistType,
  })
  @IsEnum(DataArtistType)
  readonly type: DataArtistType;

  @ApiProperty({
    description: "tags",
    example: ["abcdef"],
  })
  @IsOptional()
  @IsArray()
  @IsString()
  readonly tags?: { tag: string }[];
}
