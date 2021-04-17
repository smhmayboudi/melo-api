import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString } from "class-validator";

export class SongSendTelegramReqDto {
  constructor(id: number, sub: number) {
    this.id = id;
    this.sub = sub;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsNumberString()
  readonly id: number;

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;
}
