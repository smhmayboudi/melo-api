import { IsNumber, IsString } from "class-validator";

import { ApiHideProperty } from "@nestjs/swagger";

export class SongConfigReqDto {
  constructor(maxSize: number, url: string) {
    this.maxSize = maxSize;
    this.url = url;
  }

  @ApiHideProperty()
  @IsNumber()
  readonly maxSize: number;

  @ApiHideProperty()
  @IsString()
  readonly url: string;
}
