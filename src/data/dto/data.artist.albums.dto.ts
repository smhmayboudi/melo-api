import { IsNumber } from "class-validator";

export class DataArtistAlbumsDto {
  constructor(artistId: number, from: number, limit: number) {
    this.artistId = artistId;
    this.from = from;
    this.limit = limit;
  }

  @IsNumber()
  artistId: number;

  @IsNumber()
  from: number;

  @IsNumber()
  limit: number;
}
