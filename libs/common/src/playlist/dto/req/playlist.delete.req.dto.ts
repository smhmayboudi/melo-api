import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, ValidateNested } from "class-validator";

import { DataConfigElasticSearchReqDto } from "../../../data/dto/req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../data/dto/req/data.config-image.req.dto";
import { PlaylistConfigReqDto } from "./playlist.config.req.dto";
import { Type } from "class-transformer";

export class PlaylistDeleteReqDto {
  constructor(
    config: PlaylistConfigReqDto,
    dataConfigElasticSearch: DataConfigElasticSearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    id: string,
    sub: number
  ) {
    this.config = config;
    this.dataConfigElasticSearch = dataConfigElasticSearch;
    this.dataConfigImage = dataConfigImage;
    this.id = id;
    this.sub = sub;
  }

  @ApiHideProperty()
  @Type(() => PlaylistConfigReqDto)
  @ValidateNested()
  readonly config: PlaylistConfigReqDto;

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
  @IsString()
  readonly id: string;

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;
}
