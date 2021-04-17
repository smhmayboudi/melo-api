import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SearchQueryReqDto {
  constructor(from: number, query: string, size: number) {
    this.from = from;
    this.query = query;
    this.size = size;
  }

  @ApiProperty({
    description: "Starting point index",
    example: "0",
  })
  @IsNumberString()
  readonly from: number;

  @ApiProperty({
    description: "The query",
    example: "black book",
  })
  @IsString()
  readonly query: string;

  @ApiProperty({
    description: "Size of results",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
