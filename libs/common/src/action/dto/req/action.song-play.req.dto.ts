import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class ActionSongPlayReqDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsNumberString()
  readonly id: number;
}
