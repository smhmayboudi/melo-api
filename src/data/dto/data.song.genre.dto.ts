import { IsArray, IsNumber, IsString } from "class-validator";

export class DataSongGenreDto {
  constructor(
    from: number,
    genres: string[],
    ids: number[],
    limit: number,
    orderBy: string
  ) {
    this.from = from;
    this.genres = genres;
    this.ids = ids;
    this.limit = limit;
    this.orderBy = orderBy;
  }

  @IsNumber()
  from: number;

  @IsArray()
  @IsString()
  genres: string[];

  @IsArray()
  @IsNumber()
  ids: number[];

  @IsNumber()
  limit: number;

  @IsString()
  orderBy: string;
}
