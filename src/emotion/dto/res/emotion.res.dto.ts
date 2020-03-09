import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumberString, IsString } from "class-validator";

export class EmotionResDto {
  constructor(songId: number, emotions: string[]) {
    this.songId = songId;
    this.emotions = emotions;
  }

  @ApiProperty({
    description: "the song id",
    example: 0
  })
  @IsNumberString()
  songId: number;

  @ApiProperty({
    description: "The emotions",
    example: ["happy"],
    isArray: true,
    type: String
  })
  @IsArray()
  @IsString({ each: true })
  emotions: string[];
}
