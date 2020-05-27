import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, ValidateNested } from "class-validator";

import { DataConfigElasticSearchReqDto } from "../../../data/dto/req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../data/dto/req/data.config-image.req.dto";
import { Type } from "class-transformer";

export class SongUnlikeReqDto {
  constructor(
    dataConfigElasticSearch: DataConfigElasticSearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    id: number,
    sub: number
  ) {
    this.dataConfigElasticSearch = dataConfigElasticSearch;
    this.dataConfigImage = dataConfigImage;
    this.id = id;
    this.sub = sub;
  }

  @ApiHideProperty()
  @Type(() => DataConfigImageReqDto)
  @ValidateNested()
  readonly dataConfigElasticSearch: DataConfigElasticSearchReqDto;

  @ApiHideProperty()
  @Type(() => DataConfigImageReqDto)
  @ValidateNested()
  readonly dataConfigImage: DataConfigImageReqDto;

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsNumberString()
  readonly id: number;

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;
}
