import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class PauseSongDto {
  constructor(currentPosition: number, songId: number) {
    this.currentPosition = currentPosition;
    this.songId = songId;
  }

  @ApiProperty({
    description: "The current position",
    example: 0
  })
  @IsNumber()
  currentPosition: number;

  @ApiProperty({
    description: "The song identification",
    example: 0
  })
  @IsNumber()
  songId: number;
}
