import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, ValidateNested } from "class-validator";

import { ArtistConfigReqDto } from "./artist.config.req.dto";
import { DataConfigElasticsearchReqDto } from "../../../data/dto/req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../data/dto/req/data.config-image.req.dto";
import { Type } from "class-transformer";

export class ArtistFollowingReqDto {
  constructor(
    config: ArtistConfigReqDto,
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    from: number,
    size: number,
    sub: number
  ) {
    this.config = config;
    this.dataConfigElasticsearch = dataConfigElasticsearch;
    this.dataConfigImage = dataConfigImage;
    this.from = from;
    this.size = size;
    this.sub = sub;
  }

  @ApiHideProperty()
  @Type(() => ArtistConfigReqDto)
  @ValidateNested()
  readonly config: ArtistConfigReqDto;

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

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;
}
