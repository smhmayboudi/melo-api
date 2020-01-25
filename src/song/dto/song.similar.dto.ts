import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class SongSimilarDto {
  constructor(from: number, id: number, limit: number) {
    this.from = from;
    this.id = id;
    this.limit = limit;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0
  })
  @IsNumber()
  from: number;

  @ApiProperty({
    description: "The song identification",
    example: 0
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "Count of results",
    example: 0
  })
  @IsNumber()
  limit: number;
}
