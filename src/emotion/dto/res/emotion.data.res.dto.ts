import { IsArray, IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class EmotionDataResDto {
  constructor(songId: number, emotions: string[]) {
    this.songId = songId;
    this.emotions = emotions;
  }

  @ApiProperty({
    description: "the song id",
    example: "0",
  })
  @IsNumberString()
  readonly songId: number;

  @ApiProperty({
    description: "The emotions",
    example: ["happy"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({ each: true })
  readonly emotions: string[];
}
