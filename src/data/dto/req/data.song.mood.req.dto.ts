import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class DataSongMoodReqDto {
  constructor(from: number, limit: number, mood: string) {
    this.from = from;
    this.limit = limit;
    this.mood = mood;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumber()
  from: number;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: "The mood",
    example: "dance"
  })
  @IsString()
  mood: string;
}
