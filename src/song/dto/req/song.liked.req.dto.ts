import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

import { IsNumberString } from "class-validator";

export class SongLikedReqDto {
  constructor(from: number, size: number, sub: number) {
    this.from = from;
    this.size = size;
    this.sub = sub;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  size: number;

  @ApiHideProperty()
  sub: number;
}
