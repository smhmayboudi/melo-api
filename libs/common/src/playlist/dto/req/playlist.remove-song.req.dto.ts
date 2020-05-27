import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString, ValidateNested } from "class-validator";

import { DataConfigElasticSearchReqDto } from "../../../data/dto/req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../../../data/dto/req/data.config-image.req.dto";
import { PlaylistConfigReqDto } from "./playlist.config.req.dto";
import { Type } from "class-transformer";

export class PlaylistRemoveSongReqDto {
  constructor(
    config: PlaylistConfigReqDto,
    dataConfigElasticSearch: DataConfigElasticSearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    playlistId: string,
    songId: number
  ) {
    this.config = config;
    this.dataConfigElasticSearch = dataConfigElasticSearch;
    this.dataConfigImage = dataConfigImage;
    this.playlistId = playlistId;
    this.songId = songId;
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
  readonly playlistId: string;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly songId: number;
}
