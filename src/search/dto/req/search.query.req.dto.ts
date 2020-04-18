import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SearchQueryReqDto {
  constructor(from: number, limit: number, query: string) {
    this.from = from;
    this.limit = limit;
    this.query = query;
  }

  @ApiProperty({
    description: "Starting point index",
    example: 0,
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "Count of results",
    example: 0,
  })
  @IsNumberString()
  limit: number;

  @ApiProperty({
    description: "The query",
    example: "black book",
  })
  @IsString()
  query: string;
}
