import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNumberString,
  IsString,
  ValidateNested,
} from "class-validator";

import { DataConfigElasticsearchReqDto } from "../../../common/dto/req/common.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../common/dto/req/common.config-image.req.dto";
import { SongOrderByType } from "../../../song/song.order-by.type";
import { Type } from "class-transformer";

export class SongLanguageReqDto {
  constructor(
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    from: number,
    language: string,
    orderBy: SongOrderByType,
    size: number
  ) {
    this.dataConfigElasticsearch = dataConfigElasticsearch;
    this.dataConfigImage = dataConfigImage;
    this.from = from;
    this.language = language;
    this.orderBy = orderBy;
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
  @ApiProperty({
    description: "The language",
    example: "abcdef",
  })
  @IsString()
  readonly language: string;

  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "The order",
    example: SongOrderByType.release,
  })
  @IsEnum(SongOrderByType)
  readonly orderBy: SongOrderByType;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
