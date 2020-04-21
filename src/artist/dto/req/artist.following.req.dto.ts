import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

import { IsNumberString } from "class-validator";

export class ArtistFollowingReqDto {
  constructor(from: number, limit: number, sub: number) {
    this.from = from;
    this.limit = limit;
    this.sub = sub;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "Count of results",
    example: "0",
  })
  @IsNumberString()
  limit: number;

  @ApiHideProperty()
  sub: number;
}
