import { IsArray, IsNumber, IsString } from "class-validator";

export class DataSongNewPodcastDto {
  constructor(from: number, genres: string[], limit: number, orderBy: string) {
    this.from = from;
    this.genres = genres;
    this.limit = limit;
    this.orderBy = orderBy;
  }

  @IsNumber()
  from: number;

  @IsArray()
  @IsString()
  genres: string[];

  @IsNumber()
  limit: number;

  @IsString()
  orderBy: string;
}
