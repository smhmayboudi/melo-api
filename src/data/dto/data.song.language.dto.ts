import { IsNumber, IsString } from "class-validator";

export class DataSongLanguageDto {
  constructor(from: number, language: string, limit: number, orderBy: string) {
    this.from = from;
    this.language = language;
    this.limit = limit;
    this.orderBy = orderBy;
  }

  @IsNumber()
  from: number;

  @IsString()
  language: string;

  @IsNumber()
  limit: number;

  @IsString()
  orderBy: string;
}
