import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DataSearchQueryReqDto {
  constructor(from: number, size: number, query: string) {
    this.from = from;
    this.size = size;
    this.query = query;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  from: number;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  size: number;

  @ApiProperty({
    description: "The query",
    example: "black book",
  })
  @IsString()
  query: string;
}
