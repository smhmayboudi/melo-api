import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNumberString,
  IsString,
  ValidateNested,
} from "class-validator";

import { DataConfigElasticSearchReqDto } from "../../../data/dto/req/";
import { DataConfigImageReqDto } from "../../../data/dto/req/data.config-image.req.dto";
import { SongOrderByType } from "../../../song/song.order-by.type";
import { Type } from "class-transformer";

export class SongLanguageReqDto {
  constructor(
    dataConfigElasticSearch: DataConfigElasticSearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    from: number,
    language: string,
    orderBy: SongOrderByType,
    size: number
  ) {
    this.dataConfigElasticSearch = dataConfigElasticSearch;
    this.dataConfigImage = dataConfigImage;
    this.from = from;
    this.language = language;
    this.orderBy = orderBy;
    this.size = size;
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
