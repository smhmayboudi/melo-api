import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsNumberString, IsString } from "class-validator";

export class EmotionEmotionsReqDto {
  constructor(emotions: string[], from: number, size: number, sub: number) {
    this.emotions = emotions;
    this.from = from;
    this.size = size;
    this.sub = sub;
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
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;
}
