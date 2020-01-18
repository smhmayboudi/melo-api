import { IsNumber } from "class-validator";

export class DataSongSimilarDto {
  constructor(from: number, limit: number, songId: number) {
    this.from = from;
    this.limit = limit;
    this.songId = songId;
  }

  @IsNumber()
  from: number;

  @IsNumber()
  limit: number;

  @IsNumber()
  songId: number;
}
