import { IsNumber, IsOptional } from "class-validator";

export class DataSearchMoodDto {
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

  @IsNumber()
  from: number;

  @IsNumber()
  limit: number;

  @IsNumber()
  @IsOptional()
  classy?: number;

  @IsNumber()
  @IsOptional()
  date?: number;

  @IsNumber()
  @IsOptional()
  energetic?: number;

  @IsNumber()
  @IsOptional()
  happiness?: number;

  @IsNumber()
  @IsOptional()
  romantic?: number;
}
