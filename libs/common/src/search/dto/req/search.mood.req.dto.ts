import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, ValidateNested } from "class-validator";

import { DataConfigElasticsearchReqDto } from "../../../common/dto/req/common.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../common/dto/req/common.config-image.req.dto";
import { SearchConfigReqDto } from "./search.config.req.dto";
import { Type } from "class-transformer";

export class SearchMoodReqDto {
  constructor(
    config: SearchConfigReqDto,
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    from: number,
    size: number,
    classy?: number,
    date?: number,
    energetic?: number,
    happiness?: number,
    romantic?: number
  ) {
    this.config = config;
    this.dataConfigElasticsearch = dataConfigElasticsearch;
    this.from = from;
    this.size = size;
    this.classy = classy;
    this.date = date;
    this.energetic = energetic;
    this.happiness = happiness;
    this.romantic = romantic;
  }

  @ApiHideProperty()
  @Type(() => SearchConfigReqDto)
  @ValidateNested()
  readonly config: SearchConfigReqDto;

  @ApiHideProperty()
  @Type(() => DataConfigImageReqDto)
  @ValidateNested()
  readonly dataConfigElasticsearch: DataConfigElasticsearchReqDto;

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;

  @ApiProperty({
    description: "The classy",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly classy?: number;

  @ApiProperty({
    description: "The date",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly date?: number;

  @ApiProperty({
    description: "The energetic",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly energetic?: number;

  @ApiProperty({
    description: "The happiness",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly happiness?: number;

  @ApiProperty({
    description: "The romantic",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly romantic?: number;
}
