import { IsArray, IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DataElasticsearchEmotionsResDto {
  constructor(emotions: string[], song_id: number) {
    this.emotions = emotions;
    this.song_id = song_id;
  }

  @ApiProperty({
    description: "The emotions",
    example: ["happy"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({
    each: true,
  })
  readonly emotions: string[];

  @ApiProperty({
    description: "The song identification",
    example: "0",
  })
  @IsNumberString()
  readonly song_id: number;
}
