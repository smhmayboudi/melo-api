import { IsNumber, IsString } from "class-validator";

export class DataSearchQueryDto {
  constructor(from: number, limit: number, q: string) {
    this.from = from;
    this.limit = limit;
    this.q = q;
  }

  @IsNumber()
  from: number;

  @IsNumber()
  limit: number;

  @IsString()
  q: string;
}
