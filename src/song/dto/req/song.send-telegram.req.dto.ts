import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

import { IsNumberString } from "class-validator";

export class SongSendTelegramReqDto {
  constructor(id: number, sub: number) {
    this.id = id;
    this.sub = sub;
  }

  @ApiProperty({
    description: "The song identification",
    example: "0",
  })
  @IsNumberString()
  readonly id: number;

  @ApiHideProperty()
  readonly sub: number;
}
