import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class DataSongTopWeekReqDto {
  constructor(from: number, limit: number) {
    this.from = from;
    this.limit = limit;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "Count of results",
    example: "0",
  })
  @IsNumberString()
  limit: number;
}
