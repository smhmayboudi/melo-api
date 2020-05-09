import { IsNumberString, IsOptional } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DataSearchMoodReqDto {
  constructor(
    from: number,
    size: number,
    classy?: number,
    date?: number,
    energetic?: number,
    happiness?: number,
    romantic?: number
  ) {
    this.from = from;
    this.size = size;
    this.classy = classy;
    this.date = date;
    this.energetic = energetic;
    this.happiness = happiness;
    this.romantic = romantic;
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
    description: "The classy",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  classy?: number;

  @ApiProperty({
    description: "The date",
    example: new Date(),
  })
  @IsNumberString()
  @IsOptional()
  date?: number;

  @ApiProperty({
    description: "The energetic",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  energetic?: number;

  @ApiProperty({
    description: "The happiness",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  happiness?: number;

  @ApiProperty({
    description: "The romantic",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  romantic?: number;
}
