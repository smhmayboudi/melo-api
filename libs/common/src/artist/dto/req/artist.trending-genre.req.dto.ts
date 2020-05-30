import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";

import { DataConfigElasticsearchReqDto } from "../../../data/dto/req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../data/dto/req/data.config-image.req.dto";
import { Type } from "class-transformer";

export class ArtistTrendingGenreReqDto {
  constructor(
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    genre: string
  ) {
    this.dataConfigElasticsearch = dataConfigElasticsearch;
    this.dataConfigImage = dataConfigImage;
    this.genre = genre;
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
    description: "The genre",
    example: "pop",
  })
  @IsString()
  readonly genre: string;
}
