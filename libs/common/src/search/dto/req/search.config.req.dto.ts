import { IsNumber, IsString } from "class-validator";

import { ApiHideProperty } from "@nestjs/swagger";

export class SearchConfigReqDto {
  constructor(
    indexName: string,
    maxSize: number,
    scriptScore: string,
    suggestIndex: string
  ) {
    this.indexName = indexName;
    this.maxSize = maxSize;
    this.scriptScore = scriptScore;
    this.suggestIndex = suggestIndex;
  }

  @ApiHideProperty()
  @IsString()
  readonly indexName: string;

  @ApiHideProperty()
  @IsNumber()
  readonly maxSize: number;

  @ApiHideProperty()
  @IsString()
  readonly scriptScore: string;

  @ApiHideProperty()
  @IsString()
  readonly suggestIndex: string;
}
