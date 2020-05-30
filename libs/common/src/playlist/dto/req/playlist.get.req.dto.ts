import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";

import { DataConfigElasticsearchReqDto } from "../../../data/dto/req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../data/dto/req/data.config-image.req.dto";
import { PlaylistConfigReqDto } from "./playlist.config.req.dto";
import { Type } from "class-transformer";

export class PlaylistGetReqDto {
  constructor(
    config: PlaylistConfigReqDto,
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    id: string
  ) {
    this.config = config;
    this.dataConfigElasticsearch = dataConfigElasticsearch;
    this.dataConfigImage = dataConfigImage;
    this.id = id;
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
}
