import { IsNumber, IsString } from "class-validator";

export class DataAlbumLatestDto {
  constructor(from: number, language: string, limit: number) {
    this.from = from;
    this.language = language;
    this.limit = limit;
  }

  @IsNumber()
  from: number;

  @IsString()
  language: string;

  @IsNumber()
  limit: number;
}
