import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumberString, ValidateNested } from "class-validator";

import { DataConfigElasticsearchReqDto } from "../../../common/dto/req/common.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../common/dto/req/common.config-image.req.dto";
import { Type } from "class-transformer";

export class SongTopWeekReqDto {
  constructor(
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    from: number,
    size: number
  ) {
    this.dataConfigElasticsearch = dataConfigElasticsearch;
    this.dataConfigImage = dataConfigImage;
    this.from = from;
    this.size = size;
  }

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
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
