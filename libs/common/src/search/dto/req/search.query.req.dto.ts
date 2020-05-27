import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString, ValidateNested } from "class-validator";

import { DataConfigElasticSearchReqDto } from "../../../data/dto/req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../data/dto/req/data.config-image.req.dto";
import { SearchConfigReqDto } from "./search.config.req.dto";
import { Type } from "class-transformer";

export class SearchQueryReqDto {
  constructor(
    config: SearchConfigReqDto,
    dataConfigElasticSearch: DataConfigElasticSearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    from: number,
    query: string,
    size: number
  ) {
    this.config = config;
    this.dataConfigElasticSearch = dataConfigElasticSearch;
    this.dataConfigImage = dataConfigImage;
    this.from = from;
    this.query = query;
    this.size = size;
  }

  @ApiHideProperty()
  @Type(() => SearchConfigReqDto)
  @ValidateNested()
  readonly config: SearchConfigReqDto;

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
  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "The query",
    example: "black book",
  })
  @IsString()
  readonly query: string;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
