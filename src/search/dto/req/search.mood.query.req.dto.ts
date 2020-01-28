import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

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
    example: 0
  })
  @IsNumber()
  @IsOptional()
  classy?: number;

  @ApiProperty({
    description: "The date",
    example: new Date()
  })
  @IsNumber()
  @IsOptional()
  date?: number;

  @ApiProperty({
    description: "The energetic",
    example: 0
  })
  @IsNumber()
  @IsOptional()
  energetic?: number;

  @ApiProperty({
    description: "The happiness",
    example: 0
  })
  @IsNumber()
  @IsOptional()
  happiness?: number;

  @ApiProperty({
    description: "The romantic",
    example: 0
  })
  @IsNumber()
  @IsOptional()
  romantic?: number;
}
