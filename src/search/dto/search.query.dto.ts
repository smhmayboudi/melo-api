import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SearchQueryDto {
  constructor(from: number, limit: number, q: string) {
    this.from = from;
    this.limit = limit;
    this.q = q;
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
    example: "query"
  })
  @IsString()
  q: string;
}
