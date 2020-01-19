import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SongUnlikeDto {
  constructor(songId: string) {
    this.songId = songId;
  }

  @ApiProperty({
    description: "The song identification",
    example: 0
  })
  @IsString()
  songId: string;
}
