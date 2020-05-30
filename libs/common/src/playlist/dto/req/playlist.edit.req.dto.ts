import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { DataConfigElasticsearchReqDto } from "../../../data/dto/req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../data/dto/req/data.config-image.req.dto";
import { PlaylistConfigReqDto } from "./playlist.config.req.dto";
import { Type } from "class-transformer";

export class PlaylistEditReqDto {
  constructor(
    config: PlaylistConfigReqDto,
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    id: string,
    isPublic?: boolean,
    photoId?: string,
    title?: string
  ) {
    this.config = config;
    this.dataConfigElasticsearch = dataConfigElasticsearch;
    this.dataConfigImage = dataConfigImage;
    this.id = id;
    this.isPublic = isPublic;
    this.photoId = photoId;
    this.title = title;
  }

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
    description: "The identification",
    example: "abcdef",
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: "The publiciity",
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly isPublic?: boolean;

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsOptional()
  @IsString()
  readonly photoId?: string;

  @ApiProperty({
    description: "The title",
    example: "abcdef",
  })
  @IsOptional()
  @IsString()
  readonly title?: string;
}
