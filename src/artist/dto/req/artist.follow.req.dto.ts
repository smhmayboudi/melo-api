import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

import { IsNumberString } from "class-validator";

export class ArtistFollowReqDto {
  constructor(id: number, sub: number) {
    this.id = id;
    this.sub = sub;
  }

  @ApiProperty({
    description: "The artist identification",
    example: "0",
  })
  @IsNumberString()
  id: number;

  @ApiHideProperty()
  sub: number;
}
