import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class DataSearchQueryDto {
  constructor(from: number, limit: number, query: string) {
    this.from = from;
    this.limit = limit;
    this.query = query;
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
    description: "The query",
    example: "black book"
  })
  @IsString()
  query: string;
}
