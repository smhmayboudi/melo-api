import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class PreviousSongDto {
  constructor(
    currentSongId: number,
    currentSongPosition: number,
    previousSongId: number
  ) {
    this.currentSongId = currentSongId;
    this.currentSongPosition = currentSongPosition;
    this.previousSongId = previousSongId;
  }

  @ApiProperty({
    description: "The current song identification",
    example: 0
  })
  @IsNumber()
  currentSongId: number;

  @ApiProperty({
    description: "The current song identification",
    example: 0
  })
  @IsNumber()
  currentSongPosition: number;

  @ApiProperty({
    description: "The previous song identification",
    example: 0
  })
  @IsNumber()
  previousSongId: number;
}
