import { IsNumberString, IsOptional } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SongSearchMoodQueryDto {
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
  classy?: number;

  @ApiProperty({
    description: "The date",
    example: "0",
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
