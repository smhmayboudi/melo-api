import { IsNumber, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class NextSongDto {
  constructor(currentId: string, currentPosition: number, nextId: string) {
    this.currentId = currentId;
    this.currentPosition = currentPosition;
    this.nextId = nextId;
  }

  @ApiProperty({
    description: "The current song identification",
    example: "abcdef"
  })
  @IsString()
  currentId: string;

  @ApiProperty({
    description: "The current position",
    example: 0
  })
  @IsNumber()
  currentPosition: number;

  @ApiProperty({
    description: "The next song identification",
    example: "abcdef"
  })
  @IsString()
  nextId: string;
}
