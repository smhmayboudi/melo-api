import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class NextSongDto {
  constructor(
    currentSongId: number,
    currentSongPosition: number,
    nextSongId: number
  ) {
    this.currentSongId = currentSongId;
    this.currentSongPosition = currentSongPosition;
    this.nextSongId = nextSongId;
  }

  @ApiProperty({
    description: "The current song identification",
    example: 0
  })
  @IsNumber()
  currentSongId: number;

  @ApiProperty({
    description: "The current position",
    example: 0
  })
  @IsNumber()
  currentSongPosition: number;

  @ApiProperty({
    description: "The next song identification",
    example: 0
  })
  @IsNumber()
  nextSongId: number;
}
