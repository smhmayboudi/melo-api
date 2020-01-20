import { IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SearchMoodDto {
  constructor(
    from: number,
    limit: number,
    classy?: number,
    date?: number,
    energetic?: number,
    happiness?: number,
    romantic?: number
  ) {
    this.from = from;
    this.limit = limit;
    this.classy = classy;
    this.date = date;
    this.energetic = energetic;
    this.happiness = happiness;
    this.romantic = romantic;
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
