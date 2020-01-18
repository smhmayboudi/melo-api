import { IsNumber, IsString } from "class-validator";

export class DataSongMoodDto {
  constructor(from: number, limit: number, mood: string) {
    this.from = from;
    this.limit = limit;
    this.mood = mood;
  }

  @IsNumber()
  from: number;

  @IsNumber()
  limit: number;

  @IsString()
  mood: string;
}
