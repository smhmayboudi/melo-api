import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class SongMoodReqDto {
  constructor(from: number, limit: number, mood: string) {
    this.from = from;
    this.limit = limit;
    this.mood = mood;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumberString()
  limit: number;

  @ApiProperty({
    description: "The mood",
    example: "dance"
  })
  @IsString()
  mood: string;
}
