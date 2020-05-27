import { ApiHideProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ArtistConfigReqDto {
  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  @ApiHideProperty()
  @IsNumber()
  readonly maxSize: number;
}
