import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class SeekSongDto {
  constructor(fromSec: number, songId: number, toSec: number) {
    this.fromSec = fromSec;
    this.songId = songId;
    this.toSec = toSec;
  }

  @ApiProperty({
    description: "The from second",
    example: 0
  })
  @IsNumber()
  fromSec: number;

  @ApiProperty({
    description: "The song identification",
    example: 0
  })
  @IsNumber()
  songId: number;

  @ApiProperty({
    description: "The to second",
    example: 0
  })
  @IsNumber()
  toSec: number;
}
