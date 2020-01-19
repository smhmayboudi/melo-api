import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class PlaylistTopDto {
  constructor(from: number, limit: number) {
    this.from = from;
    this.limit = limit;
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
}
