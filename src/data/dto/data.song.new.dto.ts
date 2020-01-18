import { IsNumber } from "class-validator";

export class DataSongNewDto {
  constructor(from: number, limit: number) {
    this.from = from;
    this.limit = limit;
  }

  @IsNumber()
  from: number;

  @IsNumber()
  limit: number;
}
