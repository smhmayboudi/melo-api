import { IsNumberString, IsOptional } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SearchMoodQueryReqDto {
  constructor(
    classy?: number,
    date?: number,
    energetic?: number,
    happiness?: number,
    romantic?: number
  ) {
    this.classy = classy;
    this.date = date;
    this.energetic = energetic;
    this.happiness = happiness;
    this.romantic = romantic;
  }

  @ApiProperty({
    description: "The classy",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly classy?: number;

  @ApiProperty({
    description: "The date",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly date?: number;

  @ApiProperty({
    description: "The energetic",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly energetic?: number;

  @ApiProperty({
    description: "The happiness",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly happiness?: number;

  @ApiProperty({
    description: "The romantic",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly romantic?: number;
}
