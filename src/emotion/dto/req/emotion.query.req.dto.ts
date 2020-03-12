import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class EmotionQueryReqDto {
  constructor(emotions: string[]) {
    this.emotions = emotions;
  }

  @ApiProperty({
    description: "the emotions",
    example: ["happy"],
    isArray: true,
    type: String
  })
  @IsArray()
  @IsString({ each: true })
  emotions: string[];
}
