import { IsArray, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class EmotionEmotionsQueryReqDto {
  constructor(emotions: string[]) {
    this.emotions = emotions;
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
}
