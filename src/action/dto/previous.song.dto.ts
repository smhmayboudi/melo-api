import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class PreviousSongDto {
  constructor(currentId: string, currentPosition: number, previousId: string) {
    this.currentId = currentId;
    this.currentPosition = currentPosition;
    this.previousId = previousId;
  }

  @ApiProperty({
    description: "The current song identification",
    example: "abcdef",
  })
  @IsString()
  currentId: string;

  @ApiProperty({
    description: "The current song identification",
    example: "0",
  })
  @IsNumberString()
  currentPosition: number;

  @ApiProperty({
    description: "The previous song identification",
    example: "abcdef",
  })
  @IsString()
  previousId: string;
}
