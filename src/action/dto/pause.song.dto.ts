import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class PauseSongDto {
  constructor(currentPosition: number, id: string) {
    this.currentPosition = currentPosition;
    this.id = id;
  }

  @ApiProperty({
    description: "The current position",
    example: "0",
  })
  @IsNumberString()
  currentPosition: number;

  @ApiProperty({
    description: "The song identification",
    example: "abcdef",
  })
  @IsString()
  id: string;
}
