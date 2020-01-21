import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class PlaySongDto {
  constructor(songId: number) {
    this.songId = songId;
  }

  @ApiProperty({
    description: "The song identification",
    example: 0
  })
  @IsNumber()
  songId: number;
}
