import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumberString, ValidateNested } from "class-validator";

import { DataConfigElasticSearchReqDto } from "../../../data/dto/req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../data/dto/req/data.config-image.req.dto";
import { Type } from "class-transformer";

export class SongNewPodcastReqDto {
  constructor(
    dataConfigElasticSearch: DataConfigElasticSearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    from: number,
    size: number
  ) {
    this.dataConfigElasticSearch = dataConfigElasticSearch;
    this.dataConfigImage = dataConfigImage;
    this.from = from;
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
  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
