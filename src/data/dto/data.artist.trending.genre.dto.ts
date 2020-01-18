import { IsString } from "class-validator";

export class DataArtistTrendingGenreDto {
  constructor(genre: string) {
    this.genre = genre;
  }

  @IsString()
  genre: string;
}
