import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumberString, ValidateNested } from "class-validator";

import { DataConfigElasticsearchReqDto } from "../../../data/dto/req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../data/dto/req/data.config-image.req.dto";
import { Type } from "class-transformer";

export class SongGetByIdsReqDto {
  constructor(
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    ids: number[]
  ) {
    this.dataConfigElasticsearch = dataConfigElasticsearch;
    this.dataConfigImage = dataConfigImage;
    this.ids = ids;
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
    description: "The identification",
    example: ["abcdef"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsNumberString({}, { each: true })
  readonly ids: number[];
}
