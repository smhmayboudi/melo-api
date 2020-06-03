import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { DataConfigElasticsearchReqDto } from "../../../common/dto/req/common.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../common/dto/req/common.config-image.req.dto";
import { DownloadConfigReqDto } from "./download.config.req.dto";
import { DownloadOrderByType } from "../../download.order-by.type";
import { Type } from "class-transformer";

export class DownloadSongReqDto {
  constructor(
    config: DownloadConfigReqDto,
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    from: number,
    orderBy: DownloadOrderByType,
    size: number,
    sub: number,
    filter?: string
  ) {
    this.config = config;
    this.dataConfigElasticsearch = dataConfigElasticsearch;
    this.dataConfigImage = dataConfigImage;
    this.from = from;
    this.orderBy = orderBy;
    this.size = size;
    this.sub = sub;
    this.filter = filter;
  }

  @ApiHideProperty()
  @Type(() => DownloadConfigReqDto)
  @ValidateNested()
  readonly config: DownloadConfigReqDto;

  @ApiHideProperty()
  @Type(() => DataConfigImageReqDto)
  @ValidateNested()
  readonly dataConfigElasticsearch: DataConfigElasticsearchReqDto;

  @ApiHideProperty()
  @Type(() => DataConfigImageReqDto)
  @ValidateNested()
  readonly dataConfigImage: DataConfigImageReqDto;

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "The order",
    example: DownloadOrderByType.asc,
  })
  @IsEnum(DownloadOrderByType)
  readonly orderBy: DownloadOrderByType;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;

  @ApiProperty({
    description: "The filter",
    example: "another break in the wall",
    type: String,
  })
  @IsString()
  @IsOptional()
  readonly filter?: string;
}
