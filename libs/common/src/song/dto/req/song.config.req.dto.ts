import { IsNumber, IsString } from "class-validator";

import { ApiHideProperty } from "@nestjs/swagger";

export class SongConfigReqDto {
  constructor(maxSize: number, sendUrl: string) {
    this.maxSize = maxSize;
    this.sendUrl = sendUrl;
  }

  @ApiHideProperty()
  @IsNumber()
  readonly maxSize: number;

  @ApiHideProperty()
  @IsString()
  readonly sendUrl: string;
}
