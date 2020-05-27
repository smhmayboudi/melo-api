import { IsNumber, IsString } from "class-validator";

import { ApiHideProperty } from "@nestjs/swagger";

export class DownloadConfigReqDto {
  constructor(indexName: string, maxSize: number) {
    this.indexName = indexName;
    this.maxSize = maxSize;
  }

  @ApiHideProperty()
  @IsString()
  readonly indexName: string;

  @ApiHideProperty()
  @IsNumber()
  readonly maxSize: number;
}
