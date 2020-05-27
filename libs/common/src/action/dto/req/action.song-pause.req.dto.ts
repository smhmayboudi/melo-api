import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class ActionSongPauseReqDto {
  constructor(currentPosition: number, id: string) {
    this.currentPosition = currentPosition;
    this.id = id;
  }

  @ApiProperty({
    description: "The current position",
    example: "0",
  })
  @IsNumberString()
  readonly currentPosition: number;

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsString()
  readonly id: string;
}
